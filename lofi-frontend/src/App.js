import React, { useState } from "react";
import PlayButton from "./components/PlayButton";
import LikeButton from "./components/LikeButton";
import * as mm from "@magenta/music";
import * as Tonal from "tonal";
import Button from "@material-ui/core/Button";

function App() {
  const improvRNN = new mm.MusicRNN(
    "https://storage.googleapis.com/magentadata/js/checkpoints/music_rnn/chord_pitches_improv"
  );
  improvRNN.initialize();

  let rnnPlayer = new mm.Player();
  let pianoRnnPlayer = new mm.SoundFontPlayer(
    "https://storage.googleapis.com/magentadata/js/soundfonts/sgm_plus"
  );

  const { midi } = Tonal;

  const sequence = {
    ticksPerQuarter: 220,
    totalTime: 28.5,
    timeSignatures: [
      {
        time: 0,
        numerator: 4,
        denominator: 4
      }
    ],
    tempos: [
      {
        time: 0,
        qpm: 120
      }
    ],
    notes: [
      { pitch: midi("G4"), startTime: 0, endTime: 1 },
      { pitch: midi("E4"), startTime: 1, endTime: 3.5 },
      { pitch: midi("G4"), startTime: 3.5, endTime: 4 },
      { pitch: midi("D5"), startTime: 4, endTime: 4.5 },
      { pitch: midi("Eb5"), startTime: 4.5, endTime: 5 },
      { pitch: midi("Gb5"), startTime: 5, endTime: 6 },
      { pitch: midi("F5"), startTime: 6, endTime: 7 },
      { pitch: midi("E5"), startTime: 7, endTime: 8 },
      { pitch: midi("Eb5"), startTime: 8, endTime: 8.5 },
      { pitch: midi("C5"), startTime: 8.5, endTime: 9 },
      { pitch: midi("G4"), startTime: 9, endTime: 11.5 },
      { pitch: midi("F4"), startTime: 11.5, endTime: 12 },
      { pitch: midi("Ab4"), startTime: 12, endTime: 12.5 },
      { pitch: midi("C5"), startTime: 12.5, endTime: 13 },
      { pitch: midi("Eb5"), startTime: 13, endTime: 14 },
      { pitch: midi("D5"), startTime: 14, endTime: 15 },
      { pitch: midi("Db5"), startTime: 15, endTime: 16 },
      { pitch: midi("C5"), startTime: 16, endTime: 16.5 },
      { pitch: midi("F5"), startTime: 16.5, endTime: 17 },
      { pitch: midi("F4"), startTime: 17, endTime: 19.5 },
      { pitch: midi("G4"), startTime: 19.5, endTime: 20 },
      { pitch: midi("Ab4"), startTime: 20, endTime: 20.5 },
      { pitch: midi("C5"), startTime: 20.5, endTime: 21 },
      { pitch: midi("Eb5"), startTime: 21, endTime: 21.5 },
      { pitch: midi("C5"), startTime: 21.5, endTime: 22 },
      { pitch: midi("Eb5"), startTime: 22, endTime: 22.5 },
      { pitch: midi("C5"), startTime: 22.5, endTime: 24.5 },
      { pitch: midi("Eb5"), startTime: 24.5, endTime: 25.5 },
      { pitch: midi("G4"), startTime: 25.5, endTime: 28.5 }
    ]
  };

  const quantizedSequence = mm.sequences.quantizeNoteSequence(sequence, 1);
  const [currPlayer, setCurrPlayer] = useState(rnnPlayer);

  const handlePlayer = e => {
    e.preventDefault();
    console.log(e.target.firstChild.data);
    if (e.target.firstChild.data === "Piano") setCurrPlayer(pianoRnnPlayer);
    if (e.target.firstChild.data === "Synthesizer") setCurrPlayer(rnnPlayer);
  };
  return (
    <div className="buttons">
      <Button name="synth" onClick={handlePlayer} variant="contained">
        Synthesizer
      </Button>
      <Button name="piano" onClick={handlePlayer} variant="contained">
        Piano
      </Button>
      <PlayButton
        instrument="rnn"
        improvRNN={improvRNN}
        quantizedSequence={quantizedSequence}
        currPlayer={currPlayer}
      />
    </div>
  );
}

export default App;
