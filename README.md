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
  3. SRT style handling
  4. Subtitle merging
      - Time pairing
      - Space conservation efforts
  5. Simple SSA support
  6. Compatibility across file types
  7. Style refinements
      - Set a minimum display time
      - Fixed color options
      - Track for overlapping
      - Maximum offset match, insist of full shift otherwise
      - [add as found in earlier steps]
  7. Split into format specific node modules
  8. (unlikely to be implemented)
      - other formats
      - file validation
      - better name

### Version 1. and onwards

  CLI application, electron app, verbose feedback, even better name
