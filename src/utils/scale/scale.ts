export class Scale {
  title: string;
  steps: string;
  tonic?: number;

  constructor() {
    this.title = "";
    this.steps = "";
  }

  // A = 3 semitones, T = 2 semitones, S = 1 semitone
  static Scales: Scale[] = [
    {
      title: "Harmonic Major",
      steps: "TTSTSAS",
    },

    {
      title: "Harmonic Minor",
      steps: "TSTTSAS",
    },

    {
      title: "Double Harmonic Major",
      steps: "SASTSAS",
    },

    {
      title: "Double Harmonic Minor",
      steps: "TSASSAS",
    },

    {
      title: "Neapolitan Major",
      steps: "STTTTTS",
    },

    {
      title: "Neapolitan Minor",
      steps: "STTTSAS",
    },

    {
      title: "Major",
      steps: "TTSTTTS",
    },

    {
      title: "Minor",
      steps: "TSTTSTT",
    },

    {
      title: "Major-Minor",
      steps: "TTTTSTS",
    },

    {
      title: "Melodic Prometheus",
      steps: "TTTTSST",
    },

    {
      title: "Harmonic Prometheus",
      steps: "TTTTTSS",
    },

    {
      title: "Half Diminished",
      steps: "TSTSTTT",
    },

    {
      title: "Whole tone",
      steps: "TTTTTT",
    },

    {
      title: "Dorian",
      steps: "TSTTTST",
    },

    {
      title: "Phyrygian",
      steps: "STTTSTT",
    },

    {
      title: "Major-Phrygian",
      steps: "SATTSTS",
    },

    {
      title: "Locrian",
      steps: "STTSTTT",
    },

    {
      title: "Lydian",
      steps: "TTTSTTS",
    },

    {
      title: "Mixolydian",
      steps: "TTSTTST",
    },

    {
      title: "Hungarian Major",
      steps: "ASTSTST",
    },

    {
      title: "Major Locrian",
      steps: "TTSSTTT",
    },

    {
      title: "Phrygian Dominant",
      steps: "SASTSTT",
    },

    {
      title: "Enigmatic",
      steps: "SATTTSS",
    },

    {
      title: "Altered",
      steps: "STSTTTT",
    },

    {
      title: "Gypsy",
      steps: "TSASSTT",
    },

    {
      title: "Persian",
      steps: "SASSTAS",
    },

    {
      title: "Tritone",
      steps: "SATSAT",
    },

    {
      title: "Ukrainian Dorian",
      steps: "TSASTST",
    },

    {
      title: "Scale 505",
      steps: "ASSSSS4",
    },

    {
      title: "Scale 319",
      steps: "SSSSSA4",
    },

    {
      title: "Scale 501",
      steps: "TTSSSS4",
    },

    {
      title: "Debussy's Heptatonic",
      steps: "TSSSSAA",
    },

    {
      title: "Scale 381",
      steps: "TSSSSTA",
    },

    {
      title: "Scale 499",
      steps: "SASSSS4",
    },

    {
      title: "Scale 671",
      steps: "SSSSATA",
    },

    {
      title: "Scale 607",
      steps: "SSSSTAA",
    },

    {
      title: "Scale 415",
      steps: "SSSSAS4",
    },

    {
      title: "Scale 351",
      steps: "SSSSTT4",
    },

    {
      title: "Scale 493",
      steps: "TSTSSS4",
    },

    {
      title: "Scale 635",
      steps: "STSSSAA",
    },

    {
      title: "Scale 379",
      steps: "STSSST4",
    },

    {
      title: "Scale 491",
      steps: "STTSSS4",
    },

    {
      title: "Scale 757",
      steps: "TTSSSTT",
    },

    {
      title: "Scale 829",
      steps: "TSSSASA",
    },

    {
      title: "Scale 701",
      steps: "TSSSTTA",
    },

    {
      title: "Scale 445",
      steps: "TSSSTSA",
    },

    {
      title: "Scale 487",
      steps: "SSASSS4",
    },

    {
      title: "Scale 847",
      steps: "SSSATSA",
    },

    {
      title: "Scale 755",
      steps: "SASSSTA",
    },

    {
      title: "Scale 719",
      steps: "SSSASTA",
    },

    {
      title: "Scale 687",
      steps: "SSSTTTA",
    },

    {
      title: "Scale 623",
      steps: "SSSTSAA",
    },

    {
      title: "Scale 463",
      steps: "SSSASS4",
    },

    {
      title: "Scale 431",
      steps: "SSSTTS4",
    },

    {
      title: "Scale 367",
      steps: "SSSTST4",
    },

    {
      title: "Scale 477",
      steps: "TSSTSS4",
    },

    {
      title: "Scale 631",
      steps: "SSTSSAA",
    },

    {
      title: "Scale 375",
      steps: "SSTSST4",
    },

    {
      title: "Scale 475",
      steps: "STSTSS4",
    },

    {
      title: "Scale 949",
      steps: "TTSTSSA",
    },

    {
      title: "Scale 749",
      steps: "TSTSSTA",
    },

    {
      title: "Scale 827",
      steps: "STSSASA",
    },

    {
      title: "Scale 699",
      steps: "STSSTTA",
    },

    {
      title: "Scale 443",
      steps: "STSSTS4",
    },

    {
      title: "Scale 471",
      steps: "SSTTSS4",
    },

    {
      title: "Scale 941",
      steps: "TSTTSSA",
    },

    {
      title: "Scale 747",
      steps: "STTSSTA",
    },

    {
      title: "Harmonic Lydian",
      steps: "TTTSSAS",
    },

    {
      title: "Scale 885",
      steps: "TTSSTSA",
    },

    {
      title: "Chromatic Mixolydian",
      steps: "SSASSAT",
    },

    {
      title: "Scale 861",
      steps: "TSSTTSA",
    },

    {
      title: "Scale 733",
      steps: "TSSTSTA",
    },

    {
      title: "Chromatic Mixolydian Inverse",
      steps: "TASSASS",
    },

    {
      title: "Scale 823",
      steps: "SSTSASA",
    },

    {
      title: "Scale 727",
      steps: "SSTTSTA",
    },

    {
      title: "Scale 695",
      steps: "SSTSTTA",
    },

    {
      title: "Scale 439",
      steps: "SSTSTS4",
    },

    {
      title: "Scale 877",
      steps: "TSTSTSA",
    },
  ];
}
