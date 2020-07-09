rack-node
=========

`rack-node` Enables you convert your Java query written in natural language
to a list of Java APIs.
Search engines primarily does keyword-matching, and they perform better when you add
API keywords in your search query.
The primary use of this project is by other integrated search engines
like searching from IDE or other coding websites.
Still, you can you `rack-node` for your personal use for searching smartly
or when you just can't find the right result from Google.

To install it, run
```sh
$ npm install -g rack-node
```

The primary use is list related APIs for a natural language query
```sh
$ rack --query="how to send email in Java"
```
The output will be something like
```
IOException: 0.8899051646791389
Session: 0.8507142707028266
MimeMessage: 0.7511904511713776
File: 0.7406194353819655
Object: 0.4976190976572451
Content: 0.44785718789152057
...
```
It lists the API and relevant score calculated by RACK.
if you don't like the scores, use `-q` flag.
It will give you an output like the following.
```
Message IOException Session MimeMessage File Object Content ArrayList ...
```

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/rack-node.svg)](https://npmjs.org/package/rack-node)
[![Downloads/week](https://img.shields.io/npm/dw/rack-node.svg)](https://npmjs.org/package/rack-node)
[![License](https://img.shields.io/npm/l/rack-node.svg)](https://github.com/parvezmrobin/rack-node/blob/master/package.json)

<!-- toc -->
* [Usage](#usage)
* [Copyright](#copyright)
<!-- tocstop -->
# Usage
```sh
$ npm install -g rack-node

$ rack --query="how to send email in Java"
IOException: 0.8899051646791389
Session: 0.8507142707028266
MimeMessage: 0.7511904511713776
File: 0.7406194353819655
Object: 0.4976190976572451
Content: 0.44785718789152057
...

$ rack --query="how to send email in Java" --score=kkc
Message: 1
IOException: 0.9375
Session: 0.8125
File: 0.7500000000000001
MimeMessage: 0.6875
Object: 0.625
Content: 0.5625
...

$ rack (-v|--version|version)
rack-node/1.0.3 win32-x64 node-v12.16.1
$ rack -h
write like human, search like computer

USAGE
  $ rack QUERY

OPTIONS
  -h, --help               show CLI help
  -q, --quiet              only list the APIs
  -s, --score=kac|kkc|all  [default: all] the scoring to order suggestion
  -v, --version            show CLI version

```
# Copyright

This module is primarily a JavaScript translation of the Rack Server Java implementation.
Check [here](https://github.com/masud-technope/RACK-Server) to see original work.

```
M. Masudur Rahman, Chanchal K. Roy and David Lo, "RACK: Code Search in the IDE using Crowdsourced 
Knowledge", In Proceeding of The 39th International Conference on Software Engineering (ICSE 2017), 
pp. 51--54, Buenos Aires, Argentina, May, 2017
```
