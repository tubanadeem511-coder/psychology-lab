import MemoryTest from './games/MemoryTest.jsx';
import ShortTermTest from './games/ShortTermTest.jsx';
import ReactionTest from './games/ReactionTest.jsx';
import AttentionTest from './games/AttentionTest.jsx';
import PatternTest from './games/PatternTest.jsx';
import StroopTest from './games/StroopTest.jsx';
import DecisionTest from './games/DecisionTest.jsx';

export const games = {
  memory: MemoryTest, 'short-term-memory': ShortTermTest, 'reaction-time': ReactionTest, attention: AttentionTest,
  'pattern-recognition': PatternTest, stroop: StroopTest, 'decision-making': DecisionTest,
};
