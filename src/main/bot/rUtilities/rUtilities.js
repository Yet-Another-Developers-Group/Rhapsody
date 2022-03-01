class rUtilities {
     static fixZeroes(n, expected) {
          return n.toString().padStart(expected, "0");
     }
}

module.exports = rUtilities;