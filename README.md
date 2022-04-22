# NexonNFT

## 프로젝트 목표

- NFT에 대해 알아보기
- 협업을 통한 프로젝트 진행하기
- 완성도 있게 서비스 개발하기

## 주요 개발 내용

- 토큰 발행
- 토큰 및 이더 전송
- 토큰 정보 가져오기
- 잔액 조회
- 트랜잭션 취소
- UI 구현

## 활용 기술

- Solidity로 컨트랙트 작성
- .NET과 Web3로 이더리움 네트워크와 통신
- React로 사용자 인터페이스 개발

## 구현 순서

- 기술 조사
- 컨트랙트 작성
- 컨트랙트 배포
- 이더리움 네트워크와 통신
- 토큰 발행
- .NET으로 API 개발 및 테스트
- 프론트엔드 개발

## 추가 보완하면 좋을 점

- NFT 토큰 가격 수정 기능
- 이더 가격 변동성에 크게 의존 → 별도의 넥슨 거래용 토큰(ERC20) 발급을 했다면 안정적이고 좋았을 것 같다.
- 트랜잭션 취소 적용 못한 점
- DB 동시성 작업

## NFT 알아보기

NFT는 왜 유행할까?

- NFT = 고유하고 대체 불가능한 토큰
- 블록체인 = 분산형(Distributed) 데이터베이스
- 이러한 소유권을 증명하는 토큰이 블록체인에 있다 = 기존에 중앙서버가 다운되더라도 거래 기록 및 관리 가능 = 중앙화된 서버에 의존하지 않고 위변조 방지와 동시에 소유권 보장
- 즉, 게임 회사로부터 개인으로의 아이템의 가치 소유권 이전

## 주요 서비스

- 유저의 아이템(토큰) 정보 불러오기
- 안정적으로 유저 간 아이템 거래

## 기술 조사

- .NET으로 토큰 발급 및 거래가 가능한가?
  - YES. **Nethereum**이라는 라이브러리를 통해 .NET 기반의 DApp 개발 가능
  - Nethereum으로 스마트 컨트랙트 배포, 스마트 컨트랙트로 트랜잭션 전송, 스마트 컨트랙트와 통신 등 주요 기능 수행 가능
- NFT 거래는 우리 회사에 어떻게 도움이 될까?
  - 거래 수수료
  - 게이머 유인 수단
  - 넥슨 코인을 NFT 거래용 코인으로 발급하여 수익 모델 창출

## 스마트 컨트랙트 작성

- 토큰은 크게 ERC20, ERC721, ERC777 존재
  - ERC20: 토큰의 대체 가능성 인정
  - ERC721: 토큰의 대체 불가능성 인정 → NFT의 표준
  - ERC777: 토큰의 대체 가능성을 인정하나 거래 시에 보다 많은 기능을 추가할 수 있음. ERC20과 호환 가능
- NFT를 위해 Solidity 언어 기반으로 스마트 컨트랙트의 표준을 제공하는 [Openzeppelin](https://docs.openzeppelin.com/contracts/4.x/api/token/erc721)의 **ERC721** 컨트랙트를 확장해서 작성
- ERC721 토큰의 메타데이터
  - name: 해당 컨트랙트의 NFT 컬렉션 이름
  - symbol: NFT 컬렉션을 위한 별명
  - tokenURI: JSON파일을 가리키는 URI
- 컨트랙트 이름: NexonNFT
- 상속한 스마트컨트랙트 표준
  - ERC721URIStorage: TokenURI에 토큰의 메타 정보 저장
  - Ownable: 토큰의 특정 권한자(소유자)만 토큰 처리 가능
  - ERC721Enumerable: 유저별 토큰 리스트를 반환하기 위함

<img width="589" alt="nft1" src="https://user-images.githubusercontent.com/46207836/163961907-1e956e71-472e-4854-9cb3-32284ca30c16.png">

- 토큰 발행 함수 작성
  - 컨트랙트 소유주만 발행 가능
  - 토큰 ID를 1씩 증가하면서 토큰 발행
  - recipient로 지정된 주소로 해당 토큰 전달
  - 해당 토큰에 메타정보가 담긴 tokenURI 세팅

## **스마트 컨트랙트 배포**

- **[remix](https://remix.ethereum.org/)**라는 온라인 솔리디티 개발환경을 제공하는 툴 사용
- remix에서 제공하는 IDE를 통해 컴파일, 배포, 테스트 가능
- 컴파일 및 메타마스크에 있는 개인 계정으로 배포 완료

<figure class="half">
    <img width="318" alt="remix1" src="https://user-images.githubusercontent.com/46207836/163962266-8f30d0f4-392c-482c-8758-d49af2f26db6.png">
    <img width="310" alt="remix2" src="https://user-images.githubusercontent.com/46207836/163962431-289df1d5-1f8f-445a-99f5-4f30e047664d.png">

</figure>

## 이더리움 네트워크 통신 방식

![ethereum](https://user-images.githubusercontent.com/46207836/163964281-2c84ee06-2f12-43c8-ad2b-8535deaf7635.png)

| 주체                      | 설명                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| ------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| 이더리움 네트워크         | 💡 실제로 사용되는 이더리움을 위한 네트워크인 메인넷을 제외하고, 이더리움의 테스트넷은 크게 3가지<br />💡 그 중에서 이더리움의 채굴방식인 PoW(목표값 이하의 [해시](http://wiki.hash.kr/index.php/해시)를 찾는 과정을 무수히 반복함으로써 해당 작업에 참여했음을 증명하는 방식의 [합의 알고리즘](http://wiki.hash.kr/index.php/합의_알고리즘). <br />💡 [채굴](http://wiki.hash.kr/index.php/채굴)(mining)을 통해 작업증명)로 채굴되어서, 메인넷과 가장 유사한 Ropsten 선택                                                                                                                                                           |
| 이더리움 노드(클라이언트) | 💡 블록체인에 참여하기 위한 하나의 컴퓨터<br />💡 RPC(Remote Procedure Call) 인터페이스를 Javascript의 JSON형태로 지원 →JSON-RPC API<br />💡 블록체인의 정보를 얻거나 거래 생성가장 유명하고 많이 쓰이는 것은 Geth, Parity<br />💡 하지만 DApp 개발에만 집중하기 위해 **[Infura](https://infura.io/docs/ethereum#section/Securing-Your-Credentials)**라는 서비스 활용해 API로 이더리움 노드에 접근. 즉 Infura가 대신 JSON-RPC API를 call해준다. <br />ex) 자신의 지갑 주소의 잔액 조회<br /><img width="797" alt="curl" src="https://user-images.githubusercontent.com/46207836/163969891-2864c4ad-8269-4d95-aec8-fe29410893e1.png"> |
| Web3                      | 💡 기존의 중앙집중식 서버와 클라이언트의 구조를 벗어나서, 탈중앙화된 웹을 지향<br />💡 WWW의 차세대 버전사이트와 서비스가 분산된 컴퓨터 네트워크에 존재하도록 허용하고 블록체인 기술에 의존하여 사용자 데이터 검증웹의 참여자는 각각 비밀 키를 보유하고, 이를 사용해 사용자 식별 가능<br /><img width="599" alt="web3" src="https://user-images.githubusercontent.com/46207836/163970036-fd426630-cf83-4d2e-b835-9c0d1eabb05c.png">                                                                                                                                                                                                  |
| Pinata                    | 💡 이더리움과 통신만 탈중앙화된 것이 아니라, 메타데이터도 분산 네트워크의 일종인 IPFS기반 클라우드 플랫폼인 Pinata에 저장<br />💡 NFT 이미지와 메타데이터 JSON모두 pinata에 저장                                                                                                                                                                                                                                                                                                                                                                                                                                                     |

## **토큰 발행**

Nethereum 라이브러리를 사용해 토큰 발행

**1. FunctionMessage로 Contract의 function 매핑**

<img width="495" alt="function" src="https://user-images.githubusercontent.com/46207836/163970217-91fb8abe-d547-475b-ad04-29d39ce49269.png">

- 클래스를 Function attribute로 decorate. Function(function 이름, 리턴타입)
- 함수의 파라미터는 클래스의 property로 제공하고, Parameter attribute로 decorate. Parameter(타입, 이름, 순서)

**2. 스마트 컨트랙트와 Interacting**

```c#
/// <summary>
/// 토큰 발행
/// </summary>
public Task<string> MintNFT(string recipient, string tokenURI)
{
    var privateKey = "PRIVATE_KEY";
    var account = new Account(privateKey, Nethereum.Signer.Chain.Ropsten);
    var web3 = new Web3(account, InfuraUrl);
    var ContractHandler = web3.Eth.GetContractHandler(ContractAddress);
    var mintFunction = new MintFunction
    {
        Recipient = recipient,
        TokenURI = tokenURI
    };
    return ContractHandler.SendRequestAsync(mintFunction);
}
```

- 위에서 만든 클래스의 인스턴스를 생성
- 파라미터를 설정
- 해당 컨트랙트의 Query핸들러를 생성
- 핸들러로 해당 함수를 요청하고 Receipt 수령하고 트랜잭션 hash 확인 혹은 성공 여부 판단 가능

**결과**

컨트랙트의 트랜잭션 결과는 모두 [이더스캔](https://ropsten.etherscan.io/address/0x975ccf95abf2395143298f6f0c246232716fec26)에서 확인 가능하다.

<img width="1404" alt="etherscan" src="https://user-images.githubusercontent.com/46207836/163970944-ba5b5c69-072c-4d79-882d-6b888a4dfb67.png">

위에서 토큰을 발행한 것과 유사한 방식으로 컨트랙트의 함수를 매핑하여 토큰 전달, 정보 조회 등 필요한 서비스들을 NexonNFTLibrary라는 별도의 프로젝트에 구현하였습니다.

### 인터페이스

의존성 관리를 위해 서비스의 인터페이스를 생성하였습니다.

이를 바탕으로 컨트롤러의 API에서 인터페이스에 명세된 서비스를 호출하며 이더리움과 관련된 기능을 수행하도록 하였습니다.

## 단위 테스트

**Postman**을 사용하여 API를 테스트하며 개발을 진행하였습니다.

```javascript
pm.test("쿠키 확인", () => {
  pm.expect(pm.cookies.get("address")).to.eql("MY_ADDRESS");
  pm.expect(pm.cookies.get("privateKey").to.eql("PRIVATE_KEY"));
});
```

## 프론트엔드 개발

React를 사용하여 유저와 NFT에 대한 정보를 유저에게 보여줄 수 있도록 하였습니다.

Saga Middleware를 사용하여 API 호출의 성공과 실패에 대한 처리를 하였습니다.

가장 중점적으로 다룬 부분은, **블록체인 특성상 지연 시간이 상당하므로 이로 인한 사용자의 경험이 저하되지 않도록 로딩 여부, 성공/실패 여부를 안내**하였습니다.

✨ 로딩 화면

- 아이템 불러오기 시 로딩

<img width="649" alt="loading1" src="https://user-images.githubusercontent.com/46207836/163973870-369f67fc-5184-40c2-b4a8-8674d6e85849.png">

- 거래 시

<img width="400" alt="loading2" src="https://user-images.githubusercontent.com/46207836/163973979-7d37586e-f740-40c9-b9a7-898a070ac4fb.png">

✨ 성공 화면

<img width="457" alt="success" src="https://user-images.githubusercontent.com/46207836/163974209-7c07d802-1dfe-4500-84db-640c2636de44.png">

✨ 실패 화면

- 일반적인 거래 실패 시

<img width="447" alt="failure" src="https://user-images.githubusercontent.com/46207836/163974332-7d268482-5e6f-4d99-8862-e9432cbb1123.png">

- 잔액 부족으로 인한 거래 실패 시

추가적으로 거래를 요청한 상대자의 거래의 최소 이더인 1 이더도 없거나 아이템 가격보다 잔액이 적으면 거래 실패가 납니다.

<img width="437" alt="change" src="https://user-images.githubusercontent.com/46207836/163974459-a64c7b5c-b1b5-41bd-9652-9408f57e9a42.png">

- 비트 주의
  - 부동소수점의 경우 이진수 연산으로 인해 잦은 오차 발생
  - 거래 시 가격의 왜곡이 생기지 않도록 주의
  - 스마트 컨트랙트상 tokenId의 경우 uint256 단위로 최대 256비트(32바이트)다.
  -
  - .NET에서는 **System.Numerics.BigInteger**로 이더리움 네트워크에서 balance 가져온 후, 이더리움의 최소 단위인 wei에서 ether로 변환하면서 **decimal** type(10진수 부동소수점, 16bytes)으로 전환
  - Javascript에서는 하나의 64비트 부동소수점 타입만 존재하기 때문에 C#의 decimal 값을 그대로 받아올 수 없으므로 toFixed 사용
  - TokenID의 경우 uint256 타입으로 256비트까지 가기 때문에 외부에서는 string으로 처리(외부에는 256비트 숫자를 감당할 수 있는 타입 존재하지 않음)

참고

- [이더리움 EIP721 토큰 설명](https://eips.ethereum.org/EIPS/eip-721#simple-summary)
- [오픈제플린 ERC721 토큰 표준 스마트 컨트랙트 설명](https://docs.openzeppelin.com/contracts/4.x/api/token/erc721)
- [네더리움의 간단한 도큐먼트](https://github.com/Nethereum/Nethereum.Docs/blob/master/docs/nethereum-smartcontrats-gettingstarted.md)
- [네더리움의 단위](https://docs.nethereum.com/en/latest/nethereum-converting-units/)
