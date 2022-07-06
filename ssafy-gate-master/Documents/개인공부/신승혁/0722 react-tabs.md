# react-tabs module

## 기본 구조

```javascript
<Tabs>
    ㄴ<TabList>
        ㄴ<Tab>
    ㄴ<TabPanel>
```

## 예제 코드

```javascript
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";

<Tabs forceRenderTabPanel defaultIndex={1}>
  <TabList>
    <Tab>tab 1</Tab>
    <Tab>tab 2</Tab>
    <Tab>tab 3</Tab>
  </TabList>

  <TabPanel>
    <div>Hello Tab1</div>
  </TabPanel>
  <TabPanel>
    <div>Hello Tab1</div>
  </TabPanel>
  <TabPanel>
    <div>Hello Tab1</div>
  </TabPanel>
</Tabs>;
```

TabList의 Tab 개수와 TabPanel의 개수 일치시켜야한다.

# mui에서 tab사용

[참고자료] https://material-ui.com/components/tabs/

## 기본구조

```javascript
<AppBar>
  ㄴ<Tabs>
    ㄴ<Tab>
<TabPanel>
```

## 구현한 예제 코드

[here](https://lab.ssafy.com/s03-webmobile3-sub2/s03p12b308/blob/feature/study-seunghyuk/doc/신승혁/0722%20react-tabs-code.md)

## 구현한 예제 영상

![tabtest](https://user-images.githubusercontent.com/31649100/88172282-b2148180-cc5b-11ea-87a3-114cb53de56a.gif)

# Project에 적용하기 위해..

1. TabPanel안에 <Tabs> 추가로 생성하기
2. 서버에서 받아온 지역,반 정보를 받아와서
3. `<Tab>`과 `<TabPanel>`을 map() 함수로 생성
4. react-tabs 대신 material-ui 사용해서 구현
