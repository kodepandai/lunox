import polka from 'polka'
const app = polka()

app.listen(8000, ()=>{
    console.log('listening on port 8000')
})
