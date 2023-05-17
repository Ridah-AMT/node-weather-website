const path = require('path')
const express = require('express') //install express
const hbs = require('hbs')
const geoCode = require('../src/utils/geocode')
const getWeather = require('../src/utils/getWeather')

const app = express()

// Define paths to express config
const publicIndex = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// setup handelbar engine anfd views location
app.set('view engine', 'hbs') //install hbs
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)


// set up static directory to serve
app.use(express.static(publicIndex))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Ridah'
    })
})

app.get('/about', (req, res) => {
    res.render('about',{
        title: 'About Page',
        name: 'Hussain',
        src: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHkAAAB5CAMAAAAqJH57AAABL1BMVEX////h4PAsNH0aKUiVl8oSltTk4/IlQI+zs7NSyOySlMm0tLKvr6/o5/YqMnyPkcgAADQkLXogsucAkdIArOXq6upU0fRQVY4AFT0AGT/5+fkRI0Ty8vI4W5g8b6WX2/Pg4OAAAC4ADTnFxcXV1dUALYfV1uoQHHNna5uj3/TY2OW+v97Nzebu9/zc8fq7vcQlOIp9gI0YI3ZdYZcAEnCam7/Ky9sAACmnqNMmMlJkZIzBwNUAAEeAf6Gio8GVmaUAAB85Qlpvc4CfoaRFTWPC5fZVXG+Jzu9hwuuprLXE2vAhoNmmyukaeLokYKYjSpZ9h7ZSZKNGS4sAVn8AZY4tpNOAwemjr8iZs78xQIWBhp9GT3M3QWMACUBla4Jgq9xJSXhahr4VFmAAAFIuLmnhJV+MAAAKAklEQVRoge2ae1fbuBLA48QIE0dxTArEdrgb8nDS2JAH2DVx42x4pJhSCNx7N1vottzd/f6f4UryMw8O1Db7F3NOC5Et/TTSaDQzIZV6kzd5kzd5k9eWcm1UX/mgPqqJrwnuHO9VP6xC136t7o1rrwce7UmZTGm04klPyGSkPfu1wJUPGSTSyQqlMTmTEbZeiXyCh5eqp7lldP1XCZNPXgfcq0olQRiPWGaF0p0xeiZVe68BHhWqZ6PeaY5hVuiMjbt3MpYKr7DVdqHaE2ssi8AMPj/7+wfn5wcH+/vuc5Fh2NxEKHSSBncKVTtVQwozTF08OP90sbn5Dsvm5sWnc0IX6wzLnpQKCZ+tilDA4FytLIrwEgND8u7dJXTg5fpJVUrUwMXjvREGb6X2AUUBh/e5uLb2mfx6gRopSN4sT6pnSTqz74XvqXqOLUMKC7ha+3J903Xk5vrL2hUg7RAjxXEhQQPvFKStrRzTdgBIbrrrgXRvvWaid10oJWZlolQdiblOOwBYjRC5ofgzokAKn/vjpLZ6VK2Wax0qJKAVKN2YwvAjMVWRSgmtd1kQepUOmCPLt57WjVtqXsTUd6G0+ir9WbELhVoNzA8PwLRBpEvDBTKFzELoJWHf4kQq1RdHR3sNZSxwCUyBLUk6S8KfbJWkSWBcACyR3PbgAURzzZXjk+t7wshVDEBKV5Gai3SAFkDVKa8d9ITqaQI73SmUbNdTKK27dD69Y2F4IBDI1k46nb6bms4M4axUSiIsQ2QdkwHV6vP5dDrPN9OHmqLKsq7osqxa08M0fpDP8/yUIm+ahdJpAstd2avKeDj5rp92Jc/3m0d9vnnURL80yXyc9v4OWW29gAKX+N6kfFwga3jogz2O+y8s/RbEk9yT2FwlLnj/4t9jNBrUmumXyNEMX2bj/1zE1vl8c/O/xLTvFtVbLfk7bGI9dIkexCS7ty9Q3LXmj474FTwebbmrtIpfRyHLRTzwASJ/AnixHXJ/aOrDxQ3HzbrZct+w8E7/hvrFO9GYjO99OOWdYVHbvrWI7s9wMDQlzTy+usAV6vd7LLRPbmFy/quYOtjY2P46v+f53e2N7YPUFrF0vuWTmTjkcxTrXfpkvpXa30Dk3Xky/69t1Lqf2sn7Ol8SchxngkzbIU9d8vsnye/nyGjGv8dyY+01l0wsDJF/eY7ctFydiyMmzpFuN67XLv1T9RKyc6ouizeNeGTQ7TZMfAvI2KpeQs4Tz600uut2LDdWRkEtCS3B4cvIfIu8Peuu3+Vi6Zy67XYtkkHgjeYPnyWTbaaA1l3fYWPZdkprdDVy38s8vgXLmLyx4MLzX3Hj+za+LftObDDtNoYxyWijW9AZjCj9fnt7Y3fRc/O7G9vb7+9Qc9+ZJrztrufYWJ4klbKOvpLBAJXH29jfveWXby2e393FV0aed+OhRuOeZeLGn+aO7MR1yhFe2fyKqwqziV03nUQHxS8jlokfG9R0N5idPhMc5N21RuEQri2wsWPAspfZwOny/bgKTFEdXNNIIOIWvfgaaiv2ONhrH9xmGbaSSP5e9rMH5e4ptft3pp/odFaXj6JIkE1QWr+5rDjfRB7EzzzaaK2TqliIQSYDoXWI4X6MjSL//qEVyuxAjYl9oALZD6VSAMrWdCfdP2o2Uayf3pmibCf0GLZZNol8DknF7k0mejiLQxkcJauqoiimKlPzGR40x2eTXiUBbmciVAVJOGsvJZA4l1tKaqF+LEmSIEzirrd4UsBF3ExGONOXc/RlwWDyvhS3NvW9mnFFOjafR0NTkLwO8dCdQsYX6cP9Usq+uP73H4L3M7GKr0JoIOmBppWnihWEq2Tpb1Kowzj6oa7vhcb5lqXpLK3Iq+DI0mSFxi8ch+d6Gplsl4JhBFPlaMw2FHSSQFjQCVMMzKWz6qwa6tKL7ENHwWpLEwhUMjqdRXTDUBQVi6IYBmkis1IBPAvWWzrJJUCu2hA5bUczQs9ynPef24R3goLh2Z6wUaPP8Go7VRpZMXxUSHCb4lRn9EBnobfqu5YXSWBh0plvSwhOcxxRNku05hBVCVx3YGPSaWRy6g9/kO+hSjJALkXGXhsLMjcKhguAY09p6Rsb+ZqGLcEnLziwkGUvuDHfxKSpHTkIBNxAeoLswZdafbLUou3IAQJUsoOM5Byq5avq8urqatmvuKstZVpZpR75VCGHSE8f0K0XWJgPvvyxViwW135cLla+8WUlZR6m6HC3I2eT+BgZ9LT1cJyZLIx/VVxzpHi1gB5njh9aU9pAhxtEtTASfQHVwCe28wR4Cd228evolOEPnYjxgV/VRv6JaYeuSCCvhSU8Jdhm6Kzhvauz0cgeCl1/GjscOGVt0vBbMQR2lQa4vm4N7lkt63+N1I4YCvqKqJzN6vJw8DicmTjig5/ndP5BIkLTGj4ONLnDzjjV7xntQPuZBUVlGcZG/lE27weDx8cB+DJH/p88eHwYDO5NGQXENtMxZJ8cbaODyBJobK6Dl5Aopw+p3TC4eCsPdTf4BQpKbBSPi3Y9ykaLlmWiAbGThjaT2zI8ReA9dXsdIl9Pdcv3cDSb28If0DRk07SsKBtd+fOvjx8//j2wkDY5hk0pnt0ASzcawXpfN6zZzHtkWDi/oCBlDf5Gvf/6065E0BlZkqwjs/k40HFuCDh3+4A+lNe71455F2+6N3DoPZE5m2HElD744/He0rEtRtlo0TsqlNbDiojomLrLPaCUBv7m+fr6prveMOWht9hGllRHLI1yDyDoRKgcBPkj7JDKg8GpzqICcwi1bncdfx/bbczg0HTbFU4jV3LZdzqAieC6AzJwyjwyR3tTGVpQve02Go31WxVqXnVEprMzJ40MzmMUcsq313aOeH6Ry3r2DYZDCsqKhd3zcOhpaCAnyzDzXSORPU8CdLe7keUC+x4M0ZnTZ8PHmefeEVhzi2AeGXQiFWr85WYY8rcrqTZH+2gITUvTNMv0LgeocHTWZl0V/W2OVptyZ67nvOIDSjI4xdcHpc9B6IfBNFrsXLgrCLr+pJDeuN7i7pVK0KuSOoDByL78MBe4qxUxKhGRYm3GtRr8Gcf4nEEtxWTYuByV/V1FEQkuyDERY8CtDu4czFvh3PRprmpCKU46Z7EMG+qq466VaOAU+RulUDBVdpIZzlC9r/3RD9Vw0515UB13jVEtqTFzGQrJZEnuSJILlGqgVMfNrdAuz1W06zHLYuX5jfL0o/1c0vusLdWVxWSqYq7A5UTSJaNdjRjvvVBkbiUYRWpRT9CLRV2FxnadWH33SbFWZO5WIjX850RcRmNwEjX856Rs02F2lrbZyG7yJ2WLsdxyEP5hMf8YGGnN5mxLQ2DNsp0/Af0HltqVeo51BXFf36rDItYRkQhT/+cUdtnlSqVer5Rf/TC9yZu8yZu8SUj+D8/BSaf/EJRhAAAAAElFTkSuQmCC'
    })
})

app.get('/help', (req, res) => {
    res.render('help',{
        title: 'Help Page',
        name: 'Andrew',
        message: 'This is my help page message'
    })
})

// app.get('', (req, res) => {
//     res.send('Hello Express!')
// })

app.get('/weather', (req, res) => {
    if(!req.query.address){
        res.send('Please provide the address')
    }
    geoCode(req.query.address, (error, data) => {
        if(error){
            console.log(chalk.red(error))
        }
        if(data) {
            console.log("Weather in "+data.location)
            getWeather(data.latitude, data.longitude, (err, response) => {
                if(err){
                    console.log(chalk.red(err))
                }
                res.send({
                    forecast: response.temperature,
                    description: response.weather_descriptions,
                    address: data.location
                })
            })
        }
    })
})

app.get('/help/*', (req, res) => {
    res.render('error',{
        title: 'Error Page',
        name: 'Ridah',
        message: 'Help data not found'
    })
})

app.get('*', (req, res) => {
    res.render('error',{
        title: '404 Error Page',
        name: 'Ridah',
        message: 'Error 404 - page not found'
    })
})

app.listen(3000, () => {
    console.log('Server is up in port 3000')
})