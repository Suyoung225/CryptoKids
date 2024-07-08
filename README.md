# CryptoKids
간단한 DApp

## Hardhat Contract 
공식문서: https://hardhat.org/hardhat-runner/docs/getting-started

1. Hardhat 개발 환경 설정
```
mkdir contract
cd contract
npm install --save-dev hardhat
```

2. sample project 생성
```
npx hardhat init
```
![스크린샷 2024-07-08 오후 1 51 04](https://github.com/Suyoung225/CryptoKids/assets/87157566/d24672cc-9a69-439d-8148-3aae6bddcdcc)

![스크린샷 2024-07-08 오후 1 51 51](https://github.com/Suyoung225/CryptoKids/assets/87157566/85a88a70-ecf0-4376-ad3d-72bf8893bc21)

3. 샘플 파일 내용 수정 Lock -> CryptoKids 
- /contacts/Lock.js, /ignition/modules/Lock.js, /test/test.js

4. 로컬 이더리움 네트워크 기동, 생성된 account 목록 보기
```
npx hardhat node
```
![스크린샷 2024-07-08 오후 3 06 20](https://github.com/Suyoung225/CryptoKids/assets/87157566/2402c7cd-d061-4881-9b53-3aadcaacde95)

account 목록 metamask에 추가 (아래 메타마스크 설정에서 설명)

5. 컴파일 
```
npx hardhat compile
```
![스크린샷 2024-07-08 오후 3 07 42](https://github.com/Suyoung225/CryptoKids/assets/87157566/8980899e-e836-4cc6-a2b8-f7f56f39abaf)

artifacts 폴더 생성됨, 추후 CryptoKids.json에 있는 "abi" 필요

6. Hardhat Ignition 플러그인을 사용하여 localhost로 smart contract 배포

```
npx hardhat ignition deploy ./ignition/modules/Lock.js --network localhost
```

![스크린샷 2024-07-08 오후 2 21 45](https://github.com/Suyoung225/CryptoKids/assets/87157566/838770dd-8894-4898-b16f-53bd89cdeab7)

추후 필요한 contract address (0x5~ )

## MetaMask 설정 (크롬)
1. account 생성
2. 네트워크 직접 추가

![스크린샷 2024-07-08 오후 3 20 27](https://github.com/Suyoung225/CryptoKids/assets/87157566/32959a8d-672a-4abb-908d-f5aacd5c7702)

3. 계정 추가

![스크린샷 2024-07-08 오후 3 22 02](https://github.com/Suyoung225/CryptoKids/assets/87157566/3ae36b65-5aa6-4d93-899c-02ccacb04ec2)

+ Add account or hardware wallet 클릭 <br>
-> 계정 가져오기 클릭 <br>
-> contract 4번에서 account 목록에서 private key 아무거나 하나 가져오기

계정 세부 정보에서 이름 변경

![스크린샷 2024-07-08 오후 3 23 38](https://github.com/Suyoung225/CryptoKids/assets/87157566/4023eb57-5438-46e7-9c1e-c92cc279bbf2)


## React
1. React app build
```
npx create-react-app client
cd client
```

2. contracts의 ABI 넣어주기 (/client/src/CryptoKidsABI.json)
abi 대괄호 [ ] 까지 복붙

![스크린샷 2024-07-08 오후 3 15 30](https://github.com/Suyoung225/CryptoKids/assets/87157566/513860a1-2474-4c85-8655-f3d582cc36bc)

3. contractAddress 넣어주기
contract 6번에서 생성된 contract address 복붙

4. 실행

```
npx run
```


참고: 
- https://www.youtube.com/watch?v=s9MVkHKV2Vw&list=LL&index=11&t=9s
- https://www.youtube.com/watch?v=LSL69RGeQL0&list=LL&index=13
- https://gist.github.com/rodgtr1/427a6e0cea78281fb9ad8ea9980bb5a2

