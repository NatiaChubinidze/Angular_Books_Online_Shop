import { Component, OnInit } from '@angular/core';
import { IBooks } from '../books-search/shared/interfaces/books-response.interface';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.scss']
})
export class WishlistComponent implements OnInit {
  books:IBooks[]=[
    { "kind": "books#volume",
    "id": "dgtfDwAAQBAJ",
    "etag": "tIoOHGVolxk",
    "selfLink": "https://books.googleapis.com/books/v1/volumes/dgtfDwAAQBAJ",
    "volumeInfo": {
      "title": "Off-Road Legends",
      "subtitle":"sdhjsdhjsh",
      "authors": [
        "Blake Hoena"
      ],
      "publisher": "Capstone",
      "publishedDate": "2018-10",
      "description": "Three short stories featuring the ThunderTrucks include B-Phon facing off against the Chimera broters in a free-wheeling showdown and Atalanta entering in a death-defying race to prove her legendary speed.",
      "industryIdentifiers": [
        {
          "type": "ISBN_13",
          "identifier": "9781684360383"
        },
        {
          "type": "ISBN_10",
          "identifier": "1684360382"
        }
      ],
      "readingModes": {
        "text": false,
        "image": true
      },
      "pageCount": 144,
      "printType": "BOOK",
      "categories": [
        "Juvenile Fiction"
      ],
      "maturityRating": "NOT_MATURE",
      "allowAnonLogging": false,
      "contentVersion": "0.1.0.0.preview.1",
      "panelizationSummary": {
        "containsEpubBubbles": false,
        "containsImageBubbles": false
      },
      "imageLinks": {
        "smallThumbnail": "http://books.google.com/books/content?id=dgtfDwAAQBAJ&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api",
        "thumbnail": "http://books.google.com/books/content?id=dgtfDwAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api"
      },
      "language": "en",
      "previewLink": "http://books.google.com/books?id=dgtfDwAAQBAJ&printsec=frontcover&dq=subject:action&hl=&cd=1&source=gbs_api",
      "infoLink": "http://books.google.com/books?id=dgtfDwAAQBAJ&dq=subject:action&hl=&source=gbs_api",
      "canonicalVolumeLink": "https://books.google.com/books/about/Off_Road_Legends.html?hl=&id=dgtfDwAAQBAJ"
    },
    "saleInfo": {
      "country": "GE",
      "saleability": "free",
      "isEbook": false
    },
    "accessInfo": {
      "country": "GE",
      "viewability": "PARTIAL",
      "embeddable": true,
      "publicDomain": false,
      "textToSpeechPermission": "ALLOWED",
      "epub": {
        "isAvailable": false
      },
      "pdf": {
        "isAvailable": false
      },
      "webReaderLink": "http://play.google.com/books/reader?id=dgtfDwAAQBAJ&hl=&printsec=frontcover&source=gbs_api",
      "accessViewStatus": "SAMPLE",
      "quoteSharingAllowed": false
    }
  }
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
