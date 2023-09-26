import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA, Pipe, PipeTransform } from "@angular/core";
import { HomeComponent } from "./home.component";
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from "@angular/common/http";
import { BookService } from "src/app/services/book.service";
import { of } from "rxjs";
import { Book } from "src/app/models/book.model";


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
const bookServiceMock = {
    getBooks: ()=> of(listBook),
};
//### simularemos mockearemos un pipe, en el html hay un pipe que llama
@Pipe
({name: 'reduceText'})
class ReduceTextPipeMock implements PipeTransform{
    transform(): string {
        return '';
    }
}
//....####

describe('Home component',()=> {
    let component: HomeComponent;
    let fixture: ComponentFixture<HomeComponent>;

    beforeAll(()=>{
        
    });
    beforeEach(()=>{
        TestBed.configureTestingModule({
            imports:[
                HttpClientModule
            ],
            declarations:[
                HomeComponent,
                ReduceTextPipeMock
            ],
            providers:[
                { 
                    provide: BookService,
                    useValue: bookServiceMock
                }
            ],
            schemas:[
                CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA
            ]
        }).compileComponents();
    });

    beforeEach(()=> {
        fixture = TestBed.createComponent(HomeComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });


    it('should create',()=>{
        expect(component).toBeTruthy();
    });

    //test a suscriber observable 
    it('getBook get books from the subscription',()=>{
        const bookService = fixture.debugElement.injector.get(BookService);
        component.getBooks();
        expect(component.listBook.length).toBe(3);
    });















});