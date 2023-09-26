//###testeando a un servicio con peticiones a un API
import { HttpClientTestingModule, HttpTestingController } from "@angular/common/http/testing";
import { BookService } from "./book.service";
import { TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from "@angular/core";
import { Book } from "../models/book.model";
import { environment } from "src/environments/environment.prod";


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

describe('BookService',()=>{
    let service: BookService;
    let httpMock : HttpTestingController;

    beforeEach(()=>{
        TestBed.configureTestingModule({
            imports: [
                HttpClientTestingModule
            ],
            providers: [
                BookService
            ],
            schemas: [
                CUSTOM_ELEMENTS_SCHEMA,NO_ERRORS_SCHEMA
            ]
        });
    });

    beforeEach(()=>{
        //service = TestBed.get(BookService);//esto era antes de la version 9
        service = TestBed.inject(BookService);
        httpMock = TestBed.inject(HttpTestingController);
    });

    afterEach(()=>{
        httpMock.verify();//verifica que no haya peticiones pendiente entre cada test
    });

    it('Should be created',()=>{
        expect(service).toBeTruthy();
    });

    //testear el getBooks
    it('getBook return a list of book and does a get method',()=>{
        service.getBooks().subscribe((resp: Book[])=>{
            expect(resp).toEqual(listBook);
        });

        const req = httpMock.expectOne(environment.API_REST_URL + '/book');
        expect(req.request.method).toBe('GET');
        req.flush(listBook);
    });
});