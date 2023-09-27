import { CartComponent } from './cart.component';
import { ComponentFixture , TestBed} from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { BookService } from 'src/app/services/book.service';
// import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/compiler';
import { CUSTOM_ELEMENTS_SCHEMA ,NO_ERRORS_SCHEMA } from '@angular/core';
import { Book } from 'src/app/models/book.model';


const listBook: Book[] = [
    {
        name:'',
        author:'',
        isbn:'',
        price: 15,
        amount:2
    },
    {
        name:'',
        author:'',
        isbn:'',
        price: 20,
        amount:1
    },
    {
        name:'',
        author:'',
        isbn:'',
        price: 8,
        amount:7
    }
];

describe('Cart component', () => {
    let component: CartComponent;
    let fixture: ComponentFixture<CartComponent>;
    let service: BookService;

    beforeEach(()=>{
        TestBed.configureTestingModule({
            imports: [
                HttpClientTestingModule
            ],
            declarations:[
                CartComponent
            ],
            providers: [
                BookService
            ],
            schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
        });
    });
    

    beforeEach(()=>{
        
        fixture =  TestBed.createComponent(CartComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
        service = fixture.debugElement.injector.get(BookService);
        //en el ngOninit, vamos evitar que llame a sus metodos reales del ngoninit
        spyOn(service, 'getBooksFromCart').and.callFake(()=> listBook);
    });

    it('should create',()=>{
        expect(component).toBeTruthy();
    });


    it('getTotalPrice returns an amount',()=>{
       const totalPrice = component.getTotalPrice(listBook);
       //expect(totalPrice).toBeGreaterThan(0);//el precio es mayor a cero
       //expect(totalPrice).not.toBe(0);//el precio no sea cero
       expect(totalPrice).not.toBeNull();//el precio no se null
    });

  
    it('onInputNumberChange increments correctly',()=>{
        const action = 'plus';
        const book = {
            name:'',
            author:'',
            isbn:'',
            price: 15,
            amount:2
        };
        
        //espiando el servicio update...y ademas simularlo , osea que no llame al real
        const spy1 = spyOn(service, 'updateAmountBook').and .callFake(()=>null);
        //espiando el servicio update...y ademas simularlo , osea que no llame al real
        const spy2 = spyOn(component, 'getTotalPrice').and.callFake(()=> null);

        expect(book.amount).toBe(2);

        component.onInputNumberChange(action, book);

        expect(book.amount).toBe(3);//al principio es dos y despues de llamar al metodo es 3
        expect(book.amount === 3).toBeTrue();//similar al de arriba, evalua si es igual a 3

        expect(spy1).toHaveBeenCalled(); //saber si se llamo
        expect(spy2).toHaveBeenCalled(); //saber si se llamo 

    });

    it('onInputNumberChange decrement correctly',()=>{
        const action = 'minus';
        const book = {
            name:'',
            author:'',
            isbn:'',
            price: 15,
            amount:3
        };
        //espiando el servicio update...
        //const spy1 = spyOn(service, 'updateAmountBook'); 
        //espiando el servicio update...y ademas simularlo , osea que no llame al real
        const spy1 = spyOn(service, 'updateAmountBook').and .callFake(()=>null);
        const spy2 = spyOn(component, 'getTotalPrice').and.callFake(()=> null);

        component.onInputNumberChange(action, book);

        expect(spy1).toHaveBeenCalled(); //saber si se llamo
        expect(spy2).toHaveBeenCalled(); 

    });
    //se probara un metodo privado, pero llamando a traves de un metodo publico
    it('_onClearBooks work correctly',()=>{
        //se usar para espiar y se va a llamar
        const spy1 = spyOn((component as any), '_clearListCartBook').and.callThrough();
        //crear espia para servicio remove...y simular un valor null de retorno
        const spy2 = spyOn(service, 'removeBooksFromCart').and.callFake(()=>null);
        component.listCartBook = listBook;
        //console.log(component.listCartBook.length);
        component.onClearBooks();
        //console.log(component.listCartBook.length);
        expect(component.listCartBook.length).toBe(0);
        expect(component.listCartBook.length === 0).toBeTrue(); //es igual a la de arriba, puede eliminar si gustas
        //adicional comprobar que se llamo el ...removeBoo..
        expect(spy1).toHaveBeenCalled(); //verifica si se llamo
        expect(spy2).toHaveBeenCalled();
    });

    //llamar al metodo privado defrente, se recomiend llamar por medio de un publico
    it('_clearListCartBook()',()=>{
        const spy1 = spyOn(service, 'removeBooksFromCart').and.callFake(()=>null);
        component.listCartBook = listBook;
        component["_clearListCartBook"]();

        expect(component.listCartBook.length).toBe(0);
        expect(spy1).toHaveBeenCalled();
    });

    

});