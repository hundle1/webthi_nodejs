const express = require('express')
const connect = require('./connect.js')
const regis = require('./models/user.js')
const book = require('./models/book.js')

//kết nối Nodejs và MongoDB
async function main() {
  await connect().then(() => console.log("Ket noi database thanh cong"));
  const app = new express()
  app.use(express.static('public'));


  //set ứng dụng để gọi đến giao diện
  const path = require('path')
  const ejs = require('ejs')
  app.set('view engine', 'ejs')
  app.set('views', './views')
  app.use(express.static('public'))
  app.use(express.static(__dirname + '/public'));
  const bodyParser = require('body-parser')
  app.use(bodyParser.urlencoded({ extended: true }))
  app.use(bodyParser.json({ type: 'application/json' }))
  app.use(bodyParser.raw());

  app.use(express.static(path.join(__dirname, 'public')))

  const server = app.listen(8000, () => { console.log("Server run port 8000") })
  //post: API thực hiện thêm mớI dữ liệu
  app.post('/api/insert', (req, res) => {
    regis.create(req.body).then(() => {
      res.redirect('/menu')
    })
  })
  app.post('/api/contact', (req, res) => {
    book.create(req.body).then(() => {
      res.redirect('/contact')
    })
  })

  // //Gọi trang ứng dụng bắt đầu
  app.get('/', function (req, res) {
    res.render('home')
  })
  app.get('/about', function (req, res) {
    res.render('about')
  })
  app.get('/service', function (req, res) {
    res.render('service')
  })

  app.get('/team', function (req, res) {
    res.render('team')
  })
  app.get('/testimonial', function (req, res) {
    res.render('testimonial')
  })
  app.get('/update', function (req, res) {
    res.render('update')
  })


  app.get('/insert', function (req, res) {
    regis.find({}).then((result) => {
      console.log(result);
      res.render('insert', { user_regis: result });
      res.redirect('/insert');
    })
      .catch((err) => console.log(err))
  });
  app.get('/insert2', function (req, res) {
    regis.find({}).then((result) => {
      console.log(result);
      res.render('insert2', { user_regis: result });
      res.redirect('/insert');
    })
      .catch((err) => console.log(err))
  });



  app.get('/contact', async (req, res) => {
    book.find({}).then((result) => {
      console.log(result);
      res.render('contact', { book_regis: result });
    })
      .catch((err) => console.log(err))
  });


  app.get('/menu', async (req, res) => {
    try {
      const user_regis = await regis.find();
      res.render('menu', { user_regis });
    } catch (error) {
      console.error(error);
      res.status(500).send('Error fetching data');
    }
  });

  app.get('/product/:id', function (req, res) {
    regis.findById(req.params.id).then((result) => {
      console.log(result);
      res.render('product', { user_id_regis: result }).use(express.static('public'));
    })
      .catch((err) => console.log(err))
  })

  app.get('/product/:id', async (req, res) => {
    const id = req.params.id;
    const result = await getArticleById(id); // Assuming this function retrieves the article from your database

    if (result) {
      res.render('product', { user_id_regis: result }).use(express.static('public'));
    } else {
      res.status(404).send('Article not found');
    }
  });

  app.get('/product/:id', async (req, res) => {
    try {
      const id = req.params.id;
      const result = await regis.findById(id);
      if (result) {
        res.render('product', { user_id_regis: result }).use(express.static('public'));
      } else {
        res.status(404).send('Sản phẩm không tồn tại');
      }
    } catch (error) {
      console.error(error);
      res.status(500).send('Lỗi server');
    }
  });

  app.get('/delete2/:id', function (req, res) {
    regis.findByIdAndDelete(req.params.id).then((result) => {
      console.log('delete order successful')
      res.redirect('/insert');
    })
  })

  app.get('/delete2/:id', function (req, res) {
    regis.findByIdAndDelete(req.params.id).then((result) => {
      console.log('delete order successful')
      res.redirect('/insert');
    })
  })
  app.get('/delete2/:id', function (req, res) {
    book.findByIdAndDelete(req.params.id).then((result) => {
      console.log('delete order successful')
      res.redirect('/contact');
    })
  })
  app.get('/delete2/:id', function (req, res) {
    book.findByIdAndDelete(req.params.id).then((result) => {
      console.log('delete order successful')
      res.redirect('/contact');
    })
  })

  app.get('/update/:id', function (req, res) {
    regis.findById(req.params.id).then((result) => {
      console.log(result);
      res.render('update', { user_id_regis: result });
    })
      .catch((err) => console.log(err))
  })

  app.get('/update/:id', async (req, res) => {
    const id = req.params.id;
    const result = await getArticleById(id); // Assuming this function retrieves the article from your database

    if (result) {
      res.render('update', { user_id_regis: result });
    } else {
      res.status(404).send('Article not found');
    }
  });



  app.post('/api/update/:id', function (req, res) {
    regis.findByIdAndUpdate(req.params.id, req.body)
      .then((result) => {
        console.log('Update successful');
        res.redirect('/admin_select');
      })
      .catch((error) => {
        console.error('Update failed:', error);
        res.status(500).send('Update failed');
      });
  });
}
main().catch(err => console.error(err))