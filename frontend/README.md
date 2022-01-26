

## Dependencies

```shell
npm i package.json
```

How to keep angular code DRY (Don't repeat yourself) ? 

How to automatically generate angular doc ?
- Generate documentation with [compodoc](https://compodoc.app):
``` bash
npm run compodoc # or 'npm run compodoc-dev' to open port and watch changes 
firefox documentation/index.html
```
- Comment code with [JSDoc comments](https://compodoc.app/guides/comments.html) :
```javascript
/**
* Retrieve all lake rows. 
*/
getAll(): Observable<Lake[]> {
   return this.http.get<Lake[]>(baseUrl);
}
```

There is [3 types of tests]() :

- Unit tests

```bash
export CHROME_BIN="/snap/bin/chromium"
ng test
```

- Integration tests
- End-to-end tests (e2e)



and dev guide ?

