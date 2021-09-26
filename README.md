# RESERVE MEET

사내 회의실 예약 시스템

1. google calendar API를 활용한 일정 관리 연동.
2. 유저 개개인의 구글 캘린더에 등록된 회의 일정을 토대로, 회의실의 예약 현황을 관리할 수 있도록 개발.
3. 일자, 장소(회의실)을 기준으로 회의 일정 예약, 수정, 취소 가능.
4. 회의 예약시 회의 제목, 내용, 일자(시간), 참가자 등을 등록할 수 있다.
5. 참가자 등록시 google API를 통해 이메일로 알림이 전송 되며, 참가자의 캘린더에도 일정이 등록.
6. 모든 내용에서 수정과 삭제 가능.
7. 주간 회의 등록시 이달의 같은 요일, 같은 시간, 같은 장소에 같은 내용의 회의가 예약된다.
8. 유저 검색을 통해 당일 유저의 회의 일정 확인 가능.
9. 어드민 계정으로 로그인시, 어드민 계정, 회의실 추가, 삭제 가능.

## 개발자

- [@bg-shorthand](github.com/bg-shorthand)

## 개발 기간

- 2021\. 6. 28. ~ 2021. 9. 24.

# STACK

## FRONT-END

- HTML5
- CSS3 (Styled-component(SASS))
- Javascript
- REACT with TYPESCRIPT

## STATE-MANAGEMENT

- Recoil

## BACK-END

- AWS(E2C ubuntu)
- Node JS
- Express
- MongoDB

## LIBRARY

- gapi(Google API Library)
- React-Router
- Axios
- Lodash
- NginX
- PM2

## VCS

- Git/Github

# PROJECT STRUCTURE

```
src
 ┣ App
 ┣ Components // 컴포넌트
 ┣ Containers // 컨테이너
 ┣ Pages // 페이지
 ┣ api // 통신 api
 ┣ asset // 이미지 등의 정적파일
 ┣ const // 상수 관리
 ┣ module // 모듈 함수
 ┣ state // Recoil로 사용할 상태
 ┣ GlobalStyle.tsx
 ┣ Portal.tsx
 ┣ index.tsx
 ┗ react-app-env.d.ts
```

# EXPERIENCE

## Google API(gapi) 활용

1. Open API의 사용 경험

   - 오픈 API를 익히고 사용하는 것은, 라이브러리를 사용하는 것과는 또 다른 경험이었습니다. 준비된 공식 문서를 참조하여 하나씩 익혀 간다는 것은 보통의 라이브러리와 같지만, 원하는(Javascript, React 등을 위해 준비된) 스택이 아닐 수도 있다는 점, 비동기 통신을 기반으로 이루어진다는 점 등은 활용을 어렵게 하는 이유였습니다. 이러한 이유로 간단한 라이브러리를 처음 사용할 때보다는 익히는데 시간이 더 걸렸지만, 활용을 하게 될수록 제공되는 여러 API에 흥미를 느꼈고, 그에 대한 가능성들을 생각하게 되었습니다.

2. gapi library 다운로드 문제

   - Google API의 경우 Javascript를 위한 라이브러리를 제공하지 않았고, 그 때문에 script 태그를 통해 직접 라이브러리를 다운로드 받는 작업이 필요했습니다. 라이브러리를 다운로드 받은 후에는 라이브러리를 init해야만 원하는 API를 사용할 수 있었습니다. 이 작업들은 모두 비동기적으로 이루어 졌습니다. 처음 실행할 때에는 이 과정을 모두 기다린 후에 뷰포트를 구성할 수 있었지만, 문제는 그 이후였습니다. 이후에 새로고침을 할 때도 라이브러리를 다운로드, init하는 과정이 다시 필요해 원하는 시점에 원하는 API를 활용할 수 없었습니다. 비동기로 이루어지는 다운로드, init의 과정을 확인하기 위해 아래와 같은 코드를 사용하였습니다.

```
// userApi.ts
const userApi = {
  async getProfile() {
    if (GoogleUser) return GoogleUser.getBasicProfile();
  },
};

// CurrentUserInfo.tsx
useEffect(() => {
let timerId: NodeJS.Timeout;

const getProfile = async () => {
  if (!isOpen.spinner) setIsOpen(pre => ({ ...pre, spinner: true }));

  const profile = await userApi.getProfile();
  if (profile) {
    clearTimeout(timerId);
    const name = profile.getName();
    const imageUrl = profile.getImageUrl();
    const email = profile.getEmail();

    setUser({
      name,
      imageUrl,
      email,
      admin: !!admins.find(admin => admin.email === email),
    });

    if (isOpen.spinner) setIsOpen(pre => ({ ...pre, spinner: false }));
  } else {
    timerId = setTimeout(getProfile, 100);
  }
};
getProfile();
}, []);
```

위 코드는 setTimeout을 사용하여 매 100ms 마다 profile에 유저 정보 객체가 담겼는지를 확인합니다. userApi는 GoogleUser를 통해 gapi가 init 되었는지를 확인합니다. 이를 통해 비동기로 이루어지는 라이브러리의 다운로드를 기다리고, 그 이후에 원하는 API를 활용하여 상태를 구성하였습니다.

## Recoil

1. 보다 간편한 상태 관리

   - 이전에 주로 사용해온 Redux와 비교하여, Recoil은 훨씬 사용하기 간편한 상태 관리를 제공했습니다. 보일러 플레이트라고 부르는 코드의 작성이 거의 없었으며, Redux-thunc, Redux-saga 등의 미들웨어를 사용하지 않아도 좋다는 점이 편했습니다. useRecoilState 뿐만 아니라, useRecoilValue, useSetRecoilState, useResetRecoilState 등의 다양한 훅을 제공하는 점도 사용하기에 좋았습니다.

2. atom, selector

   - Recoil을 사용하면서 가장 좋았던 것은, 다른 상태를 바라보는 또 다른 상태를 만들 수 있다는 점이었습니다. atom으로 구성한 하나의 상태를 selector를 통해 바라보면서 새로운 상태로 가공하여 관리할 수 있다는 점입니다. 이를 사용해 아래와 같은 코드를 작성할 수 있었습니다.

```
// state.ts

const eventsState = atom({
  key: 'eventsState',
  default: [] as Events,
});

const renderEventsState = selector({
  key: 'renderEventsState',
  get: ({ get }) =>
    get(eventsState).filter(
      ({ location, date }) =>
        location &&
        location.match(/^[0-9]+/)![0] === get(curFloorState) + '' &&
        date === get(curDateState),
    ),
});

const viewEventIdState = atom({
  key: 'viewEventIdState',
  default: '',
});

const viewEventState = selector({
  key: 'viewEventState',
  get: ({ get }) => {
    const renderEvents = get(renderEventsState);
    const viewEventId = get(viewEventIdState);

    return renderEvents.find(event => event.id === viewEventId);
  },
});
```

위 코드에서 eventsState는 해당 일자에 예약되어 있는 모든 회의를 관리합니다. 이를 토대로, renderEventsState는 예약 현황에 보여질 회의들을 관리하게 됩니다. viewEventState의 경우 하나의 회의의 상세 정보를 보여줄 때 활용되는데, 그 회의의 ID만 viewEventIdState에 넣으면 되도록 작성하였습니다. 이런 구조에서는 atom으로 작성된 상태만 수정해주면 그것을 바라보는 selector 또한 그에 맞추어 변경되기에 사용하기에 좋았습니다. 단순히 편의성 뿐만 아니라, atom, selector, view로 이어지는 구조가 선형적으로 느껴지는 것이 좋았습니다.

3. 디버깅 툴의 부재

   - Recoil은 현재 개발 단계의 툴로 아직 프로덕션 레벨에서는 사용하기 어렵습니다. 특히, 디버깅을 위한 툴이 온전히 제공되지 않는다는 점이 아쉽습니다.

## Design pattern

1. page - container - component

   - 이번 프로젝트는 혼자 개발하는 프로젝트로, 단단한 기획으로부터 시작하지는 않았습니다. 따라서 필요한 컴포넌트들을 먼저 구성하고 페이지로 조합하는 대신, 큰 페이지와 기능을 먼저 개발하며 복잡도, 재사용성에 따라 컨테이너, 컴포넌트로 쪼개기로 했습니다. 이런 방식으로 불필요한 컴포넌트를 만들지 않아도 되었으며, 상황에 따라 적절하게 컴포넌트를 만들 수 있었습니다. 컴포넌트가 지나치게 많아지는 일도 방지하여 디버깅과 수정에도 용이했습니다. 문제점도 있었습니다. 컴포넌트와 컨테이너, 페이지의 관계가 지나치게 단순해진다는 점이었습니다. 단지 페이지의 한 부분이라는 이유로 컨테이너, 또 그 안의 부분이라는 이유로 컴포넌트를 구성하는 것은 프로젝트를 구성하는 데 명확한 기준을 제공하지 못했습니다. 이에 따라 보다 세밀한 구조를 가진 atomic design pattern에 관심을 갖게 되었습니다. 이번 프로젝트에는 적용하지 못했지만, 다음 프로젝트에는 적극적으로 적용해볼 수 있겠습니다.
