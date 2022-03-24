require('dotenv-defaults/config')

const postgres = require('postgres')

const sql = postgres({
  host:     process.env.POSTGRES_HOST,
  port:     process.env.POSTGRES_PORT,
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB
})

const { join } = require('path')
const { writeFile } = require('fs').promises
const { customAlphabet } = require('nanoid')

const filename = customAlphabet('abcdefghijklmnopqrstuvwxyz1234567890', 12)
const filepath = p => join(__dirname, '/assets/', p)

console.log('the script will straight up just hang at the end. no i dont know why')
console.log('just kill it after it\'s done')

// https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array#2450976
function shuffle(array) {
  let currentIndex = array.length,  randomIndex;

  // While there remain elements to shuffle...
  while (currentIndex != 0) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }

  return array;
}

const pastes = shuffle([
  {
    title: 'lua isbn check',
    content:
`
function checkIsbn13(isbn)
    local count = 0
    local sum = 0
    for c in isbn:gmatch"." do
        if c == ' ' or c == '-' then
            -- skip
        elseif c < '0' or '9' < c then
            return false
        else
            local digit = c - '0'
            if (count % 2) > 0 then
                sum = sum + 3 * digit
            else
                sum = sum + digit
            end
            count = count + 1
        end
    end
 
    if count ~= 13 then
        return false
    end
    return (sum % 10) == 0
end
 
function test(isbn)
    if checkIsbn13(isbn) then
        print(isbn .. ": good")
    else
        print(isbn .. ": bad")
    end
end
 
function main()
    test("978-1734314502")
    test("978-1734314509")
    test("978-1788399081")
    test("978-1788399083")
end
 
main()
`,
  },
  {
    title: 'bank account info',
    content:
`
username: alice
password: letsalllovelain!!!
`
  },
  {
    title: 'Q_rsqrt',
    content:
`
float Q_rsqrt( float number )
{
	long i;
	float x2, y;
	const float threehalfs = 1.5F;

	x2 = number * 0.5F;
	y  = number;
	i  = * ( long * ) &y;                       // evil floating point bit level hacking
	i  = 0x5f3759df - ( i >> 1 );               // what the fuck? 
	y  = * ( float * ) &i;
	y  = y * ( threehalfs - ( x2 * y * y ) );   // 1st iteration
//	y  = y * ( threehalfs - ( x2 * y * y ) );   // 2nd iteration, this can be removed

	return y;
}
`
  },
  {
    title: 'middle three digits',
    content:
`
function middleThree(x){
  var n=''+Math.abs(x); var l=n.length-1;
  if(l<2||l%2) throw new Error(x+': Invalid length '+(l+1));
  return n.slice(l/2-1,l/2+2);
}
 
[123, 12345, 1234567, 987654321, 10001, -10001, -123, -100, 100, -12345,
1, 2, -1, -10, 2002, -2002, 0].forEach(function(n){
  try{console.log(n,middleThree(n))}catch(e){console.error(e.message)}
});
`
  },
  {
    title: 'stallman key',
    content:
`
pub   4096R/2C6464AF2A8E4C02 2013-07-20
      Key fingerprint = 6781 9B34 3B2A B70D ED93  2087 2C64 64AF 2A8E 4C02
uid                  Richard Stallman <rms@gnu.org>
sub   4096R/2F30A2E162853425 2013-07-20
`
  },
  {
    title: 'stallman',
    content:
`


I'd just like to interject for a moment. What you're refering to as Linux, is in fact, GNU/Linux, or as I've recently taken to calling it, GNU plus Linux. Linux is not an operating system unto itself, but rather another free component of a fully functioning GNU system made useful by the GNU corelibs, shell utilities and vital system components comprising a full OS as defined by POSIX.

Many computer users run a modified version of the GNU system every day, without realizing it. Through a peculiar turn of events, the version of GNU which is widely used today is often called Linux, and many of its users are not aware that it is basically the GNU system, developed by the GNU Project.

There really is a Linux, and these people are using it, but it is just a part of the system they use. Linux is the kernel: the program in the system that allocates the machine's resources to the other programs that you run. The kernel is an essential part of an operating system, but useless by itself; it can only function in the context of a complete operating system. Linux is normally used in combination with the GNU operating system: the whole system is basically GNU with Linux added, or GNU/Linux. All the so-called Linux distributions are really distributions of GNU/Linux!

`
  },
  {
    title: 'gregory and the hawk stone wall stone fence',
    content:
`
Big open land
You hold the weight of the air in your hands
Big open air
You feel the tickle of the trees on your chest

Why'd you go and waste it
The things that you know
Are making you a stone wall, stone fence
Your stories so old you just tend to keep them

Long winding road
You've got a secret but you won't share it
`
  },
  {
    title: 'ctf info',
    content:
`
lmfao i hacked the ctf!!!
the flag is "hendumst i hringi med {}", except replace {} with "konunni minni"
`
  },
  {
    title: 'i love stallman',
    content:
`
 I'm a single atheist white man, 55, reputedly intelligent, with unusual interests in politics, science, music and dance.

I'd like to meet a woman with varied interests, curious about the world, comfortable expressing her likes and dislikes (I hate struggling to guess), delighting in her ability to fascinate a man and in being loved tenderly, who values joy, truth, beauty and justice more than "success"—so we can share bouts of intense, passionately kind awareness of each other, alternating with tolerant warmth while we're absorbed in other aspects of life.

My 25-year-old child, the Free Software Movement, occupies most of my life, leaving no room for more children, but I still have room to love a sweetheart if she doesn't need to spend time with me every day. I spend a lot of my time traveling to give speeches, often to Europe, Asia and Latin America; it would be nice if you were free to travel with me some of the time.

If you are interested, write to rms at gnu dot org and we'll see where it leads. 
`
  },
  {
    title: 'le lapin',
    content:
`
le lapin is too long to include here but you should genuinely
go read it. it's one of my favorite works of literature, where the i in "my" is
autumn, the one writing all these seed pastes

https://conworkshop.com/alexis/le_lapin.html
`
  },
  {
    title: 'sdjfk',
    content:
`
sdahfkljdsfhdsaflkasdhfaslkdhjkfhdfsjsfnkjewrewbfdsfk
`
  },
  {
    title: 'fngkdjfn',
    content:
`
slkjqhwejk nmfgnjer
`
  },
  {
    title: 'sdjfk',
    content:
`
dflgkjqwej;kwjelnr
`
  },
  {
    title: 'sdjfk',
    content:
`
wpoisjeknrkjewkjwlerl
`
  },
  {
    title: 'sdjfk',
    content:
`
weklhqwbxjbcjlejkrnjn
`
  },
  {
    title: 'communist manifesto',
    content:
`
A spectre is haunting Europe – the spectre of communism. All the
powers of old Europe have entered into a holy alliance to exorcise this
spectre: Pope and Tsar, Metternich and Guizot, French Radicals and
German police-spies.
Where is the party in opposition that has not been decried as
communistic by its opponents in power? Where is the opposition that
has not hurled back the branding reproach of communism, against the
more advanced opposition parties, as well as against its reactionary
adversaries?
Two things result from this fact:
I. Communism is already acknowledged by all European
powers to be itself a power.
II. It is high time that Communists should openly, in the
face of the whole world, publish their views, their aims,
their tendencies, and meet this nursery tale of the Spectre
of Communism with a manifesto of the party itself.
To this end, Communists of various nationalities have assembled in
London and sketched the following manifesto, to be published in the
English, French, German, Italian, Flemish and Danish languages.
`
  },
  {
    title: 'hoppipolla',
    content:
`
Brosandi
Hendumst í hringi
Höldumst í hendur
Allur heimurinn óskýr
Nema þú stendur

Rennblautur
Allur rennvotur
Engin gúmmístígvél
Hlaupandi í okkur ?
Vill springa út úr skel
`
  },
  {
    title: 'backyard metalcasting',
    content:
`
Here is my source of iron for this melt. It is an old cast iron fireplace insert. This thing slides into the fireplace opening in a home and the logs burn inside it. Of course it won't fit in the crucible in this form so I need to break it apart...
The broken iron
	

This believe it or not is the fireplace insert after about 15 minutes with a sledge hammer. Completely flattened and ready for the crucible.

While it may seem unbelievable that the thing broke apart like this so easily, it's really nothing special. Cast iron is very brittle in thin sections and cracks almost like glass. So breaking it apart is so easy a caveman can do it.
A crucible of iron
	

Here is a crucible load of thin iron scraps. They are about 1/4" in thickness. I decided to start with something that should melt easily.
Re-filling the fuel tank
	

Lately I've been re-filling the fuel tank with used motor oil instead of used cooking oil. I can get a seemingly unlimited supply of this freely from auto repair shops as mentioned on the oilburners part 7 page.

Used motor oil ignites easier and burns with a little more heat than used cooking oil. But used cooking oil is "carbon neutral" and a renewable resource. In fact check out my comparison list of used motor oil Vs. used cooking oil.
`
  },
  {
    title: 'read file',
    content:
`
var file = document.getElementById("fileInput").files.item(0); //a file input element
if (file) {
	var reader = new FileReader();
	reader.readAsText(file, "UTF-8");
	reader.onload = loadedFile;
	reader.onerror = errorHandler;
}
function loadedFile(event) {
	var fileString = event.target.result;
	alert(fileString);
}
function errorHandler(event) {
	alert(event);
}
`
  },
  {
    title: 'synapsian',
    content:
`
Synapsian
---------
  
What languages are the names of all these things?
  Synapsian. (mostly)

Is Synapsian a universal language in LFE?
  Far from it.
  
Is Synapsian the default language? Where could someone learn this language?
  You'll learn it in your LFE childhood.

What does Synapsian sound like?
  It sounds rather interesting, it sounds and writes a bit like Hangul or Japanese.

Wouldn't it be near impossible to make a keyboard/font for Synapsian?
  There's only a few characters, but a single character can mean many things, so you "mud" them in a direction. There's not many characters (think slightly more than Japanese), so it's doable. I have no clue how to make them combinable though.

Any way to get a Synapsian dictionary or text for learning?
  I'm working on it!

  A bracket underneath (ground) combines the characters into a cluster. (If multiple characters are written in one space, they automatically clusterize.)

  Clusters represent single words or ideas. Loose characters represent grammar or very simple words.

  (You can also have a ground below a single character to force it into an object state.)

  Pronunciation of loanwords (like katakana) is done with mountain brackets (above the characters).

  The circle acts like a tenten.

  Two different syles of writing Synapsian: Kodaban, with the standard separate glyphs, and iriman, the stylistic handwriting.
  
  In vertical writing, sky/mountain is on the right and ground on the bottom.
  
  Writing body-mudded words is hard with the english alphabet :(

  These all have to do with the body, so they're all mudded towards the empty h (body)
  as such, "SJI" becomes "SH"

  if you were to mud it towards Sky it'd be like "sjy" with a pitched-up i
  it's interesting, this language, as its vocabulary is very very close to the Japanese one but its writing system took a completely different turn somewhere.
  
Can you leave some of the Infinity posts untranslated so that we can see a larger sample of the language?
  I'll ask around if I can do that - although I'm not that great at Synapsian (and most Synapsian I've been writing is honestly very bad).

How was Japanese inspired by Synapsian? How did they receive this information?
  Anything that happens causes Aurora to vibrate, and it also vibrates on its own. This vibration gets echoed through the entirety of Systemspace. As such, Aurora in other Systems may resonate. We call this Auroraic Interference.

  So: In LFE the Aurora vibrated with Synapsian -> Vibrations spread to Life -> Life's Aurora vibrates with Synapsian

  Then someone invents something like Synapsian (Japanese, most Asian languages.)
  
Is Synapsian a naturally created language, or was it deliberately designed with the intent of creating a universal language?
  A mix of both. It's very early stage was deliberately created but it has evolved.
  
Is Synapsian one standard language, or is it more of a Chinese situation where multiple mutually unintelligible "dialects" are grouped under one language?
  It's more like Chinese (despite many attempts to standardize it, which just added more dialects).
  
Do they speak English in LFE?
  No, in LFE most people speak Synapsian. The acronym is in ""English"" because the language for Systemspace itself is English. (This English is quite a bit different from the human English, though.)

Do they know English?
  No, but it can be translated.
  
Do you mind explaining some of the curse words that they use in LFE?
  Honestly swearing doesn't really have it own words - it's more the way you talk to people that signifies your disgust. If anything, the word "t'xa" would be something along the lines of "fuck" or "shit".

Will we make the fully developed language of Systemspace, if we ever take our time to translate everything to fit into it?
   Frankly, even I don't know enough Synapsian to make that happen. If someone tells me how to make Unicode be smart, I could try and make a font that uses an empty Unicode block for Synapsian (and maybe make a program that adds the Synapsian block to any font), but I have no clue how Unicode works, so I don't know.
`
  },
  {
    title: 'init',
    content:
`
asmlinkage __visible void __init __no_sanitize_address start_kernel(void)
{
	char *command_line;
	char *after_dashes;

	set_task_stack_end_magic(&init_task);
	smp_setup_processor_id();
	debug_objects_early_init();
	init_vmlinux_build_id();

	cgroup_init_early();

	local_irq_disable();
	early_boot_irqs_disabled = true;

	/*
	 * Interrupts are still disabled. Do necessary setups, then
	 * enable them.
	 */
	boot_cpu_init();
	page_address_init();
	pr_notice("%s", linux_banner);
	early_security_init();
	setup_arch(&command_line);
	setup_boot_config();
	setup_command_line(command_line);
	setup_nr_cpu_ids();
	setup_per_cpu_areas();
	smp_prepare_boot_cpu();	/* arch-specific boot-cpu hooks */
	boot_cpu_hotplug_init();

	build_all_zonelists(NULL);
	page_alloc_init();

	pr_notice("Kernel command line: %s\n", saved_command_line);
	/* parameters may set static keys */
	jump_label_init();
	parse_early_param();
	after_dashes = parse_args("Booting kernel",
				  static_command_line, __start___param,
				  __stop___param - __start___param,
				  -1, -1, NULL, &unknown_bootoption);
	print_unknown_bootoptions();
	if (!IS_ERR_OR_NULL(after_dashes))
		parse_args("Setting init args", after_dashes, NULL, 0, -1, -1,
			   NULL, set_init_arg);
	if (extra_init_args)
		parse_args("Setting extra init args", extra_init_args,
			   NULL, 0, -1, -1, NULL, set_init_arg);

	/*
	 * These use large bootmem allocations and must precede
	 * kmem_cache_init()
	 */
	setup_log_buf(0);
	vfs_caches_init_early();
	sort_main_extable();
	trap_init();
	mm_init();

	ftrace_init();

	/* trace_printk can be enabled here */
	early_trace_init();
`
  },
  {
    title: 'aegis',
    content:
`
static __always_inline void crypto_aegis_aesenc(union aegis_block *dst,
						const union aegis_block *src,
						const union aegis_block *key)
{
	const u8  *s  = src->bytes;
	const u32 *t = crypto_ft_tab[0];
	u32 d0, d1, d2, d3;

	d0 = t[s[ 0]] ^ rol32(t[s[ 5]], 8) ^ rol32(t[s[10]], 16) ^ rol32(t[s[15]], 24);
	d1 = t[s[ 4]] ^ rol32(t[s[ 9]], 8) ^ rol32(t[s[14]], 16) ^ rol32(t[s[ 3]], 24);
	d2 = t[s[ 8]] ^ rol32(t[s[13]], 8) ^ rol32(t[s[ 2]], 16) ^ rol32(t[s[ 7]], 24);
	d3 = t[s[12]] ^ rol32(t[s[ 1]], 8) ^ rol32(t[s[ 6]], 16) ^ rol32(t[s[11]], 24);

	dst->words32[0] = cpu_to_le32(d0) ^ key->words32[0];
	dst->words32[1] = cpu_to_le32(d1) ^ key->words32[1];
	dst->words32[2] = cpu_to_le32(d2) ^ key->words32[2];
	dst->words32[3] = cpu_to_le32(d3) ^ key->words32[3];
}
`
  },
  {
    title: 'the',
    content:
`
with import ../lib;

{ nixpkgs ? { outPath = cleanSource ./..; revCount = 130979; shortRev = "gfedcba"; }
, stableBranch ? false
, supportedSystems ? [ "x86_64-linux" "aarch64-linux" ]
, configuration ? {}
}:

with import ../pkgs/top-level/release-lib.nix { inherit supportedSystems; };

let

  version = fileContents ../.version;
  versionSuffix =
    (if stableBranch then "." else "pre") + "$\{toString nixpkgs.revCount}.\${nixpkgs.shortRev}";

  # Run the tests for each platform.  You can run a test by doing
  # e.g. ‘nix-build -A tests.login.x86_64-linux’, or equivalently,
  # ‘nix-build tests/login.nix -A result’.
  allTestsForSystem = system:
    import ./tests/all-tests.nix {
      inherit system;
      pkgs = import ./.. { inherit system; };
      callTest = t: {
        \${system} = hydraJob t.test;
      };
    };
  allTests =
    foldAttrs recursiveUpdate {} (map allTestsForSystem supportedSystems);

  pkgs = import ./.. { system = "x86_64-linux"; };

`
  },
  {
    title: 'output',
    content:
`
Sieving took 2489.6647 ms

Checking first few prime numbers of sequential ones:
ones checked found
   3   32540  3923
   5     182    44
   7      32     9
  11       8     1
  13       6     3
  17       4     1
  19       4     1
Adding Brazilian primes to the sieve took 1.2049 ms

The first 20 Brazilian numbers are:
7 8 10 12 13 14 15 16 18 20 21 22 24 26 27 28 30 31 32 33 

The first 20 odd Brazilian numbers are:
7 13 15 21 27 31 33 35 39 43 45 51 55 57 63 65 69 73 75 77 

The first 20 prime Brazilian numbers are:
7 13 31 43 73 127 157 211 241 307 421 463 601 757 1093 1123 1483 1723 2551 2801 

Required output took 0.0912 ms

Decade count of Brazilian numbers:
             10th is 20               time:   0.0951 ms
            100th is 132              time:   0.0982 ms
          1,000th is 1,191            time:   0.1015 ms
         10,000th is 11,364           time:   0.1121 ms
        100,000th is 110,468          time:   0.2201 ms
      1,000,000th is 1,084,566        time:   0.9421 ms
     10,000,000th is 10,708,453       time:   8.0068 ms
    100,000,000th is 106,091,516      time:  78.0114 ms
  1,000,000,000th is 1,053,421,821    time: 758.0320 ms

Total elapsed was 3249.0197 ms
`
  },
  {
    title: 'e',
    content:
`
#include <Kernel/Sections.h>

.section .text

.global gdt64ptr
gdt64ptr:
#if ARCH(X86_64)
.quad 0
#else
.int 0
#endif

.global code64_sel
code64_sel:
.short 0

/*
  The apic_ap_start function will be loaded to P0x00008000 where the APIC
  will boot the AP from in real mode. This code also contains space for
  special variables that *must* remain here. When initializing the APIC,
  the code here gets copied to P0x00008000, the variables in here get
  populated and then the the boot of the APs will be triggered. Having
  the variables here allows us to access them from real mode. Also, the
  code here avoids the need for relocation entries.
  Basically, the variables between apic_ap_start and end_apic_ap_start
  *MUST* remain here and cannot be moved into a .bss or any other location.
*/
.global apic_ap_start
.type apic_ap_start, @function
.align 8
apic_ap_start:
.code16
    cli
    jmp $0x800, $(1f - apic_ap_start) /* avoid relocation entries */
1:
    mov %cs, %ax
    mov %ax, %ds

    xor %ax, %ax
    mov %ax, %sp

    /* load the first temporary gdt */
    lgdt (ap_cpu_gdtr_initial - apic_ap_start)

    /* enable PM */
    movl %cr0, %eax
    orl $1, %eax
    movl %eax, %cr0
`
  },
  //...repeat(() => ({ title: randomTitle(), content: randomContent() }))(15)
]).map(v => ({...v, filename: filename() })).map(v => ({...v, content: v.content.trim()}))

;(async () => {
  for(let i = 0; i < pastes.length; i++) {
    const { title, filename, content } = pastes[i]
    await sql`insert into pastes (title, filename, username) values (${title}, ${filename}, 'alice')`
    await writeFile(filepath(filename), content)
    console.log(`${i + 1} of ${pastes.length}...`)
  }
})()

  /*.map(({ title, content, filename }, index) => Promise.all([
      writeFile(filepath(filename), content),
      sql`insert into pastes (title, filename, username) values (${title}, ${filename}, 'alice')`
    ]))
*/
