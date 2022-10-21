const fs = require('fs')
class Container {
  constructor(name) {
    this.filename = name
  }
  async getAll() {
    try {
      const producto = await fs.promises.readFile(this.filename, 'utf-8')
      if (producto.length > 0) {
        const product = JSON.parse(producto)
        return product
      }
    } catch (error) {
      console.log('No se encontro el archivo!!, generando...')
    }
  }
  //Escribir, sobre escribir el contenido
  async write() {
    await fs.promises.writeFile(
      this.file,
      JSON.stringify(this.content, null, '')
    )
    console.log('Guardado')
  }

  //Que hay dentro del contenedor
  //   async getAll(file) {
  //     return this.content
  //   }

  //guardar en el archivo e incrementar
  async save(product) {
    try {
      const productos = await this.getAll()
      if (fs.existsSync(this.filename)) {
        if (productos.length > 0) {
          const lastId = productos[productos.length - 1].id + 1
          product.id = lastId
          productos.push(product)
          await fs.promises.writeFile(
            this.filename,
            JSON.stringify([productos], null, 2)
          )
        } else {
          product.id = 1
          await fs.promises.writeFile(
            this.filename,
            JSON.stringify([product], null, 2)
          )
        }
      } else {
        product.id = 1
        await fs.promises.writeFile(
          this.filename,
          JSON.stringify([product], null, 2)
        )
      }
    } catch (error) {
      return 'El producto no se guardo'
    }
  }

  //Para buscar uno del archivo
  async getById(id) {
    let resp = await this.getAll()
    try {
      const product = resp.find((products) => products.id === id)
      return product
    } catch {
      return console.log('Aqui no hay nada')
    }
  }

  //Para eliminar solo 1 del archivo
  async deleteById(id) {
    const productos = await this.getAll()
    try {
      const newContent = productos.filter((e) => e.id !== id)
      await fs.promises.writeFile(
        this.filename,
        JSON.stringify(newContent, null, 2)
      )
      return ` elemento ${id} eliminado`
    } catch (error) {
      return 'elemento no se elimina'
    }
  }

  //Eliminar todos los objetos del archivo
  async deleteAll() {
    const productos = await this.getAll()
    try {
      const result = productos.splice(0, productos.length)
      await fs.promises.writeFile(
        this.filename,
        JSON.stringify(result, null, 2)
      )
      return 'todo se elimino'
    } catch (error) {
      return ' no se elimino nada'
    }
  }
}
const producto1 = {
  title: 'Diabolo',
  price: 5000,
  thumbnail: 'https://m.media-amazon.com/images/I/51qSz6uu8xL._AC_SX569_.jpg',
}
const producto2 = {
  title: 'Diabolo regtro',
  price: 55000,
  thumbnail: 'https://m.media-amazon.com/images/I/51qSz6uu8xL._AC_SX569_.jpg',
}
const manejador = new Container('productos.txt')
console.log(manejador)
const getData = async () => {
  //   await manejador.save(producto1)
  //   await manejador.save(producto2)
//   const productoEncontrado = await manejador.getById(2)
//   console.log(productoEncontrado)
//   const eliminar = await manejador.deleteById(1)
//   console.log(eliminar)
  const eliminaTodo = await manejador.deleteAll()
  console.log(eliminaTodo)
}
getData()
