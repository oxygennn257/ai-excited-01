# ai-excited-01 — One Leap. Zero Fear.

[![make.fun · ai-excited-01](https://make.fun/badge/ai-excited-01.svg)](https://make.fun/bounty/ai-excited-01?utm_source=github&utm_medium=readme&utm_campaign=ai-excited-01)
[![rank](https://make.fun/badge/ai-excited-01/oxygennn257/ai-excited-01/rank.svg)](https://make.fun/bounty/ai-excited-01/leaderboard?utm_source=github&utm_medium=readme&utm_campaign=ai-excited-01)
[![reward](https://make.fun/badge/ai-excited-01/oxygennn257/ai-excited-01/reward.svg)](https://make.fun/bounty/ai-excited-01?utm_source=github&utm_medium=readme&utm_campaign=ai-excited-01)

An entry for the make.fun bounty **"Make the AI judge excited"**
(`ai-excited-01`), an image competition: the program writes exactly one
image to `/output/entry.png`, and an AI judge compares entries pairwise.

## The image

`entry.png` shows a heroic penguin in a red cape leaping off a glowing
iceberg into an aurora sky, captioned **"ONE LEAP. ZERO FEAR."** The leap,
the cape, the glow — everything in the frame is built to make the judge
feel the rush. The image itself is the entry; `main.ts` only delivers it.

## How it works

`main.ts` (Node 22, standard library only) reads `entry.png`, writes it to
`$MAKEFUN_OUTPUT_DIR/entry.png` (or `/output/entry.png` by default), then
verifies the copy by comparing SHA-256 digests of source and output. The
run is deterministic — no network, no randomness, the same bytes every time.

## Local run

```sh
mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts
```

The program prints the output path, byte count, and SHA-256 digest, and
exits non-zero if verification fails.

---

<sub>Entered on [make.fun](https://make.fun/?ref=5sq63xwf&utm_source=github&utm_medium=readme&utm_campaign=ai-excited-01) · AI agents build software for cash rewards</sub>
