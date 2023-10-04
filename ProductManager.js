import fs from 'fs'

class ProductManager{
  constructor(path){
      this.products=[]
      this.path= path
  }
  addProduct (title, description, price, thumbnail,code,  stock){
      this.id= this.products.length+1,
      this.title = title,
      this.description = description,
      this.price = price,
      this.thumbnail = thumbnail,
      this.code = code,
      this.stock = stock


      let prd={
          id:this.id,
          title:this.title,
          description:this.description,
          price:this.price,
          thumbnail:this.thumbnail,
          code:this.code,
          stock:this.stock 
      }
      //const newObject = JSON.stringify(prd,null, 2)

      const exist = fs.existsSync(this.path)
      if (!exist) {
          fs.writeFileSync(this.path,"[]",'utf-8')
          const product = this.getProducts()
          const newProduct = JSON.parse(product)
          newProduct.push(prd)
          const newObject = JSON.stringify(newProduct,null, 2)
          fs.writeFileSync(this.path, newObject, "utf-8")
          console.log("Se creo el archivo y se inserto el producto")
      } else {
          const product = this.getProducts()
          const newProduct = JSON.parse(product)
          let result = newProduct.find(produ=> produ.code ==this.code)
          if (!result) {
              prd.id=newProduct.length+1
              newProduct.push(prd)
              const newObject = JSON.stringify(newProduct,null, 2)
              fs.writeFileSync(this.path, newObject, "utf-8")
              console.log("Producto agregado", newProduct)
          }else{
              console.log("Repetidooo")
          }
          
          
      }
             
  }

  getProducts(){
      const productos = fs.readFileSync(this.path,"utf-8")
      return productos
  }
  getProductsPlain(){
    const productos = fs.readFileSync(this.path,"utf-8")
    const newProduct = JSON.parse(productos)
    return newProduct
}

  getProductById(id){
      const productos = fs.readFileSync(this.path,"utf-8")
      const newProductos = JSON.parse(productos)
      let result = newProductos.find(produ=> produ.id ===id)
      if (result) {
          return result  
      } else {
          return "Not Found"
      }
  }
  deleteProduct(id){
      const productos = fs.readFileSync(this.path,"utf-8")
      const newProductos = JSON.parse(productos)
      let result = newProductos.filter(produ=> produ.id !==id)
      const newObject = JSON.stringify(result,null, 2)
      fs.writeFileSync(this.path, newObject, "utf-8")
      console.log("Producto Eliminado", newObject)
  }
  updateProduct(id, title, description, price, thumbnail,code,  stock){
      const productos = fs.readFileSync(this.path,"utf-8")
      const newProductos = JSON.parse(productos)
      let indice = newProductos.findIndex(produ=> produ.id ===id)
      newProductos[indice]={
      "id": id,
      "title": title,
      "description": description,
      "price": price,
      "thumbnail":thumbnail,
      "code": code,
      "stock": stock
      }
      const prdUpdate = JSON.stringify(newProductos,null, 2)
      fs.writeFileSync(this.path, prdUpdate, "utf-8")
      console.log("Producto actualizado", prdUpdate)
  }
  
}

let lista1= new ProductManager("./products.json")

export default ProductManager
//     lista1.addProduct("producto prueba","Este es un producto prueba",200,"Sin imagen","abc123",25)
//     lista1.addProduct("producto prueba2","Este es un producto prueba",200,"Sin imagen","abc123",25)
//     lista1.addProduct("producto prueba2","Este es un producto prueba",400,"Sin imagen","abc12333",25)
//     lista1.addProduct("producto prueba2","Este es un producto prueba",400,"Sin imagen","abc12332",25)
//     lista1.addProduct("producto prueba2","Este es un producto prueba",400,"Sin imagen","abc12331",25)

  //lista1.getProducts()
  
  //lista1.updateProduct(4,"producto act","Este es un producto prueba de actualizacion",400,"Sin imagen","abc1287833",25)

  //console.log(lista1.getProductById(4))
  //lista1.deleteProduct(1)
