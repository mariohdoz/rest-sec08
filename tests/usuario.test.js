const { request } = require("../server/routes/usuarioRoute");

describe('inicio de sesión', () => {
    it('Debería iniciar sesión y devolver información de usuario', () => {
        request(app)
        .post("/login")
        .send({
          email: "test1@gmail.com",
          password: "123456",
        })
        .end((err, res)=>{
            expect(res.statusCode).equalTo(200)
        })
        
        ;
    });
});