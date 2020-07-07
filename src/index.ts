import { Command, flags } from '@oclif/command';
import CodeTokenProvider, { Score } from './core/CodeTokenProvider';

class RackNode extends Command {
  static description = 'describe the command here'

  static flags = {
    // add --version flag to show CLI version
    version: flags.version({ char: 'v' }),
    help: flags.help({ char: 'h' }),
    // flag with a value (-s, --score=VALUE)
    score: flags.string({ char: 's', description: 'the scoring to order suggestion', default: 'all' }),
  }

  static args = [{ name: 'query', required: true }]

  async run() {
    const { args, flags } = this.parse(RackNode);
    let score: Score;
    switch (flags.score.toLowerCase()) {
    case 'kkc':
      score = Score.KKC;
      break;
    case 'kac':
      score = Score.KAC;
      break;
    default:
      score = Score.ALL;
    }
    const rawQuery = args.query.substr('--query='.length);
    this.log(await new CodeTokenProvider(rawQuery).recommendApi(score));
  }
}

export = RackNode
