if not len(params) > 0 then
    exit("Usage: scanlib <lib_path>")
end if

x = include_lib("/lib/metaxploit.so")
p_lib = params.pull

m = x.load(p_lib)
if not m then
    exit("[Error] Could not load: '" + p_lib + "'")
end if

z = x.scan(m)
t = ""
for a in z
    t = t + a + "\n"
    for l in x.scan_address(m, a).split("\n")[2:]
        if l[:6] == "Unsafe" then
            v = l.split(" ")[5][:-1]
            t = t + "  " + v + "\n"
        else if l != "" then
            t = t + "    " + l + "\n"
        end if
    end for
    t = t + "\n"
end for

print(t[:-2])