const path = require('path');

module.exports = {
  entry: './src/index.js', // Ścieżka do głównego pliku wejściowego
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js', // Nazwa pliku wyjściowego
  },
  // Dodajemy tu nasze reguły dla różnych typów plików, np. dla SVG
  module: {
    rules: [
      {
        test: /\.svg$/, // Testujemy czy plik kończy się na .svg
        use: ['@svgr/webpack', 'file-loader'], // Używamy @svgr/webpack i file-loader do obsługi plików SVG
      },
      // Można dodać inne reguły tutaj, na przykład dla JS, CSS, etc.
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'], // Rozszerzenia plików, które webpack powinien rozpoznawać
  },
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    port: 9000, // Port, na którym będzie działać serwer deweloperski
  },
};