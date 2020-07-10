export class Article {
    body: string = '';
    id: number = -1;
    title: string = '';
    userId: number = -1;
}

class Address {
    street: string = '';
    suite: string = '';
    city: string = '';
    zipcode: string = '';
}

class Company {
    name: string = '';
    catchPhrase: string = '';
}

export class User {
    address: Address = new Address();
    company: Company = new Company();
    email: string = '';
    id: number = -1;
    name: string = '';
    phone: string = '';
    username: string = '';
    website: string = '';
}
