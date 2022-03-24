require('dotenv-defaults/config')

const express = require('express')
const app = express()
const nunjucks = require('nunjucks')
const { join } = require('path')
const { sql } = require('./db')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const { nanoid, customAlphabet } = require('nanoid')
const { STATUS_CODES } = require('http')
const { writeFile, readFile } = require('fs/promises')
const { checkServerIdentity } = require('tls')

const jwtSecret = process.env.JWT_SECRET

app.use('/static', express.static(join(__dirname, 'static')))

app.use(require('cookie-parser')())
app.use(require('body-parser').urlencoded({ extended: true }))

nunjucks.configure(join(__dirname, 'pages'), {
  autoescape: false,
  express: app
})

const error = (status, message) => {
  const e = new Error(message)
  e.status = status
  return e
}

const getUser = req => {
  if(req.cookies.auth) {
    return jwt.decode(req.cookies.auth)
  } else {
    return undefined
  }
}

const authenticated = (req, _, next) => {
  if(!getUser(req)) {
    next(error(403, 'You must be authenticated to see this page!'))
  } else {
    next()
  }
}

app
  .get('/', async (req, res, next) => {
    try {
      const user = getUser(req)
      res.render('index.njk', {
        user,
        title: 'Home',
        layout: 'base.njk',
      })
    } catch(e) {
      next(e)
    }
  })

  .get('/login', async (req, res, next) => {
    try {
      const user = getUser(req)
      res.render('login.njk', {
        user,
        title: 'Log in',
        layout: 'base.njk'
      })
    } catch(e) {
      next(e)
    }
  })
  .post('/login', async (req, res, next) => {
    try {
      const { username, password } = req.body
      if(!username || !password) {
        next(error(400, 'No username or password provided'))
        return
      }
      const [ user ] = await sql`select * from users where username = ${username}`
      if(!user) {
        next(error(404, 'No such user'))
        return
      }

      const match = await bcrypt.compare(password, user.password)
      if(!match) {
        next(error(400, 'Incorrect password'))
        return
      }

      const token = jwt.sign({
        id: user.id,
        username: user.username,
        admin: user.admin
      }, jwtSecret)

      res.cookie('auth', token)

      res.redirect('/')
    } catch(e) {
      next(e)
    }
  })

  .get('/register', async (req, res, next) => {
    try {
      const user = getUser(req)
      res.render('register.njk', {
        user,
        title: 'Register',
        layout: 'base.njk'
      })
    } catch(e) {
      next(e)
    }
  })
  .post('/register', async (req, res, next) => {
    try {
      const { username, password } = req.body
      if(!username || !password) {
        next(error(400, 'No username or password provided'))
        return
      }

      const [ user ] = await sql`select * from users where username = ${username}`
      if(user) {
        next(error(400, 'A user with that username already exists'))
        return
      }

      const hash = await bcrypt.hash(password, 10)

      const [ sqlResult ] = await sql.unsafe(`
        insert into users
          (id, username, password, admin)
        values
          ('${nanoid()}', '${username}', '${hash}', false)

        returning *
      `)

      const token = jwt.sign({
        id: sqlResult.id,
        username: sqlResult.username,
        admin: sqlResult.admin
      }, jwtSecret)

      res.cookie('auth', token)

      res.redirect('/')
    } catch(e) {
      next(e)
    }
  })

  .get('/logout', authenticated, (req, res) => {
    try {
      const user = getUser(req)
      res.render('logout.njk', {
        user,
        title: 'Home',
        layout: 'base.njk',
      })
    } catch(e) {
      next(e)
    }
  })

  .post('/logout', authenticated, (_, res) => {
    res.cookie('auth', '')
    res.redirect('/')
  })

  .get('/paste', authenticated, async (req, res, next) => {
    try {
      const user = getUser(req)
      res.render('new_paste.njk', {
        user,
        title: 'Home',
        layout: 'base.njk',
      })
    } catch(e) {
      next(e)
    }
  })

  .post('/paste', authenticated, async (req, res, next) => {
    try {
      const { username } = getUser(req)
      const filename = customAlphabet('abcdefghijklmnopqrstuvwxyz1234567890', 12)()
      const { title } = req.body

      const [ paste ] = await sql.unsafe(`
        insert into pastes
          (title, filename, username)
        values
          ('${title}', '${filename}', '${username}')
        returning *
      `)

      await writeFile(join(__dirname, '../assets', filename), req.body.pasteContent)
      res.redirect(`/${paste.filename}`)
    } catch(e) {
      next(e)
    }
  })

  .get('/user', async (req, res, next) => {
    try {
      const user = getUser(req)
      const page = Number.isNaN(+req.query.page) ? 0 : +req.query.page
      const pastes = await sql`
        select *
          from pastes
          where username = ${user.username}
          limit 10
          offset ${10 * page}
      `

      const numPastes = (await sql`select count(filename) from pastes where username = ${user.username}`)[0].count
      const lastPage = Math.floor(numPastes / 10)

      res.render('user_pastes.njk', {
        user,
        layout: 'base.njk',
        title: 'Your pastes',
        pastes,
        numPastes,
        lastPage,
        page
      })
    } catch(e) {
      next(e)
    }
  })

  .get('/:id', async (req, res, next) => {
    try {
      const user = getUser(req)
      const filename = req.params.id
      const content = await readFile(join(__dirname, '../assets', filename))
      const [{ title }] = await sql`select * from pastes where filename=${filename}`

      res.render('view_paste.njk', {
        layout: 'base.njk',
        paste_content: content,
        title,
        user
      })
    } catch(e) {
      if(e.errno === -2) {
        next(error(404, 'No paste found by this filename'))
      } else {
        next(e)
      }
    }
  })


app.use((err, req, res, _) => {
  res.status(err.status || 500)
  const user = getUser(req)
  try {
    res.render('error.njk', {
      layout: 'base.njk',
      err,
      err_msg: STATUS_CODES[err.status],
      user
    })
  } catch(e) {
    res.send(`error: ${err}\nalso got error rendering the error page: ${e}`)
  }
})

const port = Number.isNaN(process.env.PORT) ? 3000 : process.env.PORT

app.listen(port, () => console.log(`running on ${port}`))


