import Memory, { score as memory } from './Memory.jsx';
import Reaction, { score as reaction } from './Reaction.jsx';
import Attention, { score as attention } from './Attention.jsx';
import Pattern, { score as pattern } from './Pattern.jsx';
import Stroop, { score as stroop } from './Stroop.jsx';
import Decision, { score as decision } from './Decision.jsx';
import ShortTerm, { score as shortTerm } from './ShortTerm.jsx';

// Maps registry ids to gameplay component + pure scoring function.
export const engines = {
  memory: { Component: Memory, score: memory },
  'reaction-time': { Component: Reaction, score: reaction },
  attention: { Component: Attention, score: attention },
  'pattern-recognition': { Component: Pattern, score: pattern },
  stroop: { Component: Stroop, score: stroop },
  'decision-making': { Component: Decision, score: decision },
  'short-term-memory': { Component: ShortTerm, score: shortTerm },
};
