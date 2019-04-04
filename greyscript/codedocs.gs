main = function()
   s = get_shell
   c = s.host_computer
   f = c.File
   r = get_router("192.168."+c.lan_ip.split("\.")[2]+".1")
   p = r.used_ports[0]
   C = {}
   C.s = "Hello"
   C.i = 1337
   myC = new C + {"classID":"MyClass"}
   
   t =     m(s)
   t = t + m(c)
   t = t + m(f)
   t = t + m(r)
   t = t + m(p)
   t = t + m(myC)
   
   print(t)
end function

m = function(o)
   t = str(o) + "\n"
   for e in o
      if e.key == "__isa" then
         for e2 in e.value
            t=t+"  "+str(e2)[9:-1].remove(""", ""value""").remove(": FUNCTION")+"\n"
         end for
      else
         t=t+"  "+e.key+": "+e.value+"\n"
      end if
   end for
   return t + "\n"
end function

main