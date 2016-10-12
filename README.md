notimeforthat.org
=================

Static html page generator for the blog [notimeforthat.org][notimeforthat]
The blog deals with projects I have no time to build but I want to think about what would
be the best way to realize them.

# Include Files

```
#file/filename#
```

`#title#` and `#date#` within a file will be replaced with the title and the creation date of the file.


# Use repeat

The inner html will be repeated for every file within a directory

```
#repeat/assets#
<h1>#title#</h1>
<h3>#date#</h3>
<div>#content#</div>
#repeatClosed#
```



[notimeforthat]: http://notimeforthat.org/
