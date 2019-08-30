xploit = include_lib("/lib/metaxploit.so")
crypto = include_lib("/lib/crypto.so")

main = function()
	C = {} // MyClass
	C.doesAbsolutelyNothing = function(iAmNotSelf) ; end function
	C.s = "Hello World!"
	C.i = 1337
	myC = new C + {"classID":"MyClass"}
	
	s = get_shell
	c = s.host_computer
	ftp = s.connect_service(c.lan_ip, 21, "GorgonRamsay", "p", "ftp")
	f = c.File("/")
	r = get_router("192.168."+c.lan_ip.split(".")[2]+".1")
	p = r.used_ports[0]
	n = xploit.net_use(p.get_lan_ip, p.port_number)
	meta = n.dump_libs
	
	t =     m(myC)     // Custom class
	t = t + m(s)       // Shell / SSH
	t = t + m(ftp)     // FTP
	t = t + m(c)       // Computer
	t = t + m(f)       // File
	t = t + m(r)       // Router
	t = t + m(p)       // Port
	t = t + m(crypto)  // Lib crypto
	t = t + m(xploit)  // Lib metaxploit
	t = t + m(n)       // Netsession
	t = t + m(meta)    // Metalib
	
	print(t[:-2])
	c.touch(home_dir, "codedocs.txt")
	c.File(home_dir+"/codedocs.txt").set_content(t)
end function

m = function(o)
	if o == null then
		return "[Error] Null object!\n\n"
	end if
	t = str(o) + "\n"
	for e in o
		if e.key == "__isa" then
			for e2 in e.value
				t=t+"  "+str(e2)[9:-1].remove(""", ""value""").remove(": FUNCTION")+"\n"
			end for
		else if e.key != "classID" then
			t=t+"  "+e.key+": "+e.value+"\n"
		end if
	end for
	return t + "\n"
end function

main
