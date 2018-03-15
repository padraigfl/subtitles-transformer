Subtitling Modifier Package
=========

A collection of processes for converting and modifying popular subtitle file formats.
Coded entirely in ES5 with no external production dependencies.

Tests: `npm run mocha`
Linting is supplied using ESLint with configurations set up to follow ES5 standards


##  Roadmap

### Version 0.

  1. Reading, writing and parsing for SRT files ✓
  2. Time modifying capabilities
      - Moving by ms ✓
      - Character limits ✓
      - Newline substitution ✓
  3. SRT style handling ✓
  4. Subtitle merging ✓
      - Time pairing ✓ (needs refactoring)
      - Space conservation efforts
  5. SSA support ✓
  6. Compatibility across file types
  7. Possible style refinements (carried across versions)
      - Refine merging process hugely
      - Set a minimum display time
      - Fixed color options
      - Track for overlapping subs
      - Maximum offset match, insist on full shift otherwise
      - Opaque background style option
      - Match subtitles-parser object attributes
      - [add as found in earlier steps]
  7. Split into format specific node modules
  8. (unlikely to be implemented)
      - other formats
      - file validation
      - better name

### Version 1. and onwards

  CLI application, electron app, verbose feedback, even better name

### Compromises

- All SSA data other than the times and text will be scrapped, including inline styles (this may be made optional later for ones supported by SRT)
- Pairing will be a hot mess until later on, currently focused on just having a version that works somewhat okay (e.g. subtitles appear at the same time, ideally disappear at the same time too. Anything more precise seems like it would be a big distraction to the video)
- I'm looking at following an object structure that matches the most popular SRT package currently, subtitles-parser. I may utilise it at a later date instead of some self-contained operations
