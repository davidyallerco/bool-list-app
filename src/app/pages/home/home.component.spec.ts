import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from "@angular/core";
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

describe('Home component',()=> {
    let component: HomeComponent;
    let fixture: ComponentFixture<HomeComponent>;

    beforeEach(()=>{
        TestBed.configureTestingModule({
            imports:[
                HttpClientModule
            ],
            declarations:[
                HomeComponent
            ],
            providers:[
                BookService
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
        // const listBook: Book[] = [];
        const spy1 = spyOn(bookService, 'getBooks').and.returnValue(of(listBook));
        component.getBooks();
        expect(spy1).toHaveBeenCalled();
        expect(component.listBook.length).toBe(3);//es tres porque el array de book es tres
    });















});