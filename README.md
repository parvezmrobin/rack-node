rack-node
=========

write like human, search like computer

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/rack-node.svg)](https://npmjs.org/package/rack-node)
[![Downloads/week](https://img.shields.io/npm/dw/rack-node.svg)](https://npmjs.org/package/rack-node)
[![License](https://img.shields.io/npm/l/rack-node.svg)](https://github.com/parvezmrobin/rack-node/blob/master/package.json)

<!-- toc -->
* [Usage](#usage)
* [Copyright](#copyright)
<!-- tocstop -->
# Usage
<!-- usage -->

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
USAGE
  $ rack QUERY

OPTIONS
  -h, --help         show CLI help
  -s, --score=score  [default: all] the scoring to order suggestion
  -v, --version      show CLI version

```
<!-- usagestop -->

# Copyright

This module is primarily a JavaScript translation of the Rack Server Java implementation.
Check [here](https://github.com/masud-technope/RACK-Server) to see original work.

```
M. Masudur Rahman, Chanchal K. Roy and David Lo, "RACK: Code Search in the IDE using Crowdsourced 
Knowledge", In Proceeding of The 39th International Conference on Software Engineering (ICSE 2017), 
pp. 51--54, Buenos Aires, Argentina, May, 2017
```
