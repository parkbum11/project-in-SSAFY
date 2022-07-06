# React와 Node.js 연동하기

react proect 폴더 밖에 package.json 파일을 만든다

실행은 yarn dev

```json
{
  "name": "management",
  "version": "1.0.0",
  "scripts": {
    "client": "cd client && yarn start",
    "server": "nodemon server.js",
    "dev": "concurrently --kill-others-on-fail \"yarn server\" \"yarn client\""
  },
  "dependencies": {
    "body-parser": "^1.19.0",
    "express": "^4.17.1",
    "nodemon": "^2.0.4",
    "yarn": "^1.22.4"
  },
  "devDependencies": {
    "concurrently": "^4.1.2"
  }
}
```

React 요청코드

```javascript
import React, { useState, useEffect } from "react";
import { Customer } from "components";

const Home = () => {
  const [customers, setCustomers] = useState("");
  const callApi = async () => {
    const res = await fetch("/api/customers");
    const body = await res.json();
    return body;
  };

  // componentDidMount()
  useEffect(() => {
    callApi().then((res) => {
      setCustomers(res);
    });
  });

  return (
    <div>
      <h2>홈</h2>
      {customers
        ? customers.map((c) => {
            return <Customer id={c.id} name={c.name} birtyhday={c.birtyhday} />;
          })
        : ""}
    </div>
  );
};

export default Home;
```

Node.js 응답코드

```javascript
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/api/customers", (req, res) => {
  res.send([
    { id: 1, name: "신승혁", birthday: "931217" },
    { id: 2, name: "김동욱", birthday: "920101" },
  ]);
});

app.listen(port, () => console.log(`Listening on port ${port}`));
```
