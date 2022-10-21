class Usuario {
  constructor(nombre, apellido) {
    this.nombre = nombre
    this.apellido = apellido
    this.mascotas = []
    this.libros = []
  }

  getFullName(nombre, apellido) {
    return `tu nombre completo ${nombre},${apellido}`
  }
  addMascotas(mascota) {
    return this.mascotas.push(mascota)
  }
  countMascotas() {
    return this.mascotas.length
  }
  addBook(nombre, autor) {
    let libro = {
      titulo: nombre,
      autor: autor,
    }
    return this.libros.push(libro)
  }
  gerBootNames() {
    return this.libros.map((book) => book.titulo)
  }
}
console.log()