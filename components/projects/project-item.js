import Image from "next/image";

export default function ProjectItem({ data }) {
  const title = data.properties.Name.title[0].plain_text;
  const description = data.properties.description.rich_text[0].plain_text;
  const imgSrc = data.cover.file?.url || data.cover.external.url;
  const tags = data.properties.Tags.multi_select;
  const lifeperiodStart = data.properties.lifeperiod.date.start;
  const lifeperiodEnd =
    data.properties.lifeperiod.date.end === null
      ? "現在"
      : data.properties.lifeperiod.date.end;
  const relationship =
    data.properties.relationship.checkbox == true ? "Good" : "Not Bad";

  const calculatedPeriod = (lifeperiodStart, lifeperiodEnd) => {
    const date = new Date();
    const year = date.getFullYear();
    const month = ("0" + (date.getMonth() + 1)).slice(-2);
    const day = ("0" + date.getDate()).slice(-2);
    const dateStr = year + "-" + month + "-" + day;

    const endToday = dateStr.split("-");
    // const startDateStringArray = lifeperiodStart.substr(0,4)
    // const endDateStringArray = lifeperiodEnd == "현재" ? todayDate.getFullYear() : lifeperiodEnd.substr(0,4)
    const startDateStringArray = lifeperiodStart.split("-");
    const endDateStringArray =
      lifeperiodEnd == "現在" ? endToday : lifeperiodEnd.split("-");

    var startDate = new Date(
      startDateStringArray[0],
      startDateStringArray[1],
      startDateStringArray[2]
    );
    var endDate = new Date(
      endDateStringArray[0],
      endDateStringArray[1],
      endDateStringArray[2]
    );

    console.log(`lifeperiodEnd: ${lifeperiodEnd}`);
    console.log(`startDate: ${startDateStringArray}`);
    console.log(`endDate: ${endDateStringArray}`);

    // const result = Math.abs(endDateStringArray - startDateStringArray);
    const diffInMs = Math.abs(endDate - startDate);
    const result = diffInMs / (1000 * 60 * 60 * 24) / 365;

    console.log(`期間 : ${result}`);
    return Math.floor(result);
  };

  const calculatedPeriod2 = (lifeperiodStart, lifeperiodEnd) => {
    const date = new Date();
    const year = date.getFullYear();
    const month = ("0" + (date.getMonth() + 1)).slice(-2);
    const day = ("0" + date.getDate()).slice(-2);
    const dateStr = year + "-" + month + "-" + day;

    const endToday = dateStr.split("-");

    // 시작 날짜와 종료 날짜를 분리
    const startDateStringArray = lifeperiodStart.split("-");
    const endDateStringArray =
      lifeperiodEnd === "現在" ? endToday : lifeperiodEnd.split("-");

    // Date 객체 생성 (월은 0부터 시작하므로 -1 해줘야 함)
    const startDate = new Date(
      parseInt(startDateStringArray[0]), // 연도
      parseInt(startDateStringArray[1]) - 1, // 월 (0부터 시작하므로 1 빼줌)
      parseInt(startDateStringArray[2]) // 일
    );
    const endDate = new Date(
      parseInt(endDateStringArray[0]),
      parseInt(endDateStringArray[1]) - 1,
      parseInt(endDateStringArray[2])
    );

    // 개월 수 계산
    let yearDiff = endDate.getFullYear() - startDate.getFullYear();
    let monthDiff = endDate.getMonth() - startDate.getMonth();
    let dayDiff = endDate.getDate() - startDate.getDate();

    // 일 수가 음수면 개월 수에서 1을 빼고 일 수 조정
    if (dayDiff < 0) {
      monthDiff -= 1;
      dayDiff += new Date(
        endDate.getFullYear(),
        endDate.getMonth(),
        0
      ).getDate();
    }

    // 최종 개월 수 계산 (년 * 12 + 개월)
    const totalMonths = yearDiff * 12 + monthDiff;

    console.log(`근무 기간 (개월): ${totalMonths}`);
    return totalMonths;
  };

  // 예시 사용
  const start = "2020-03-15";
  const end = "2023-05-10";
  const periodInMonths = calculatedPeriod2(start, end); // 근무 기간 (개월) 계산
  console.log(`총 근무 기간: ${periodInMonths}개월`);

  return (
    <div className="project-card">
      <Image
        className="rounded-t-xl"
        src={imgSrc}
        alt="cover image"
        width="100"
        height="100"
        layout="responsive"
        objectFit="cover"
        quality={100}
      />

      <div className="p-4 flex flex-col">
        <h1 className="text-2xl font-bold">{title}</h1>
        <h4 className="mt-4 text-xl">
          {lifeperiodStart} ~ {lifeperiodEnd} (
          {calculatedPeriod2(lifeperiodStart, lifeperiodEnd)})
        </h4>
        <h3 className="mt-4 text-xl">{description}</h3>
        <h4 className="mt-4 text-xl">満足度 : {relationship}</h4>
        <div className="flex items-start mt-2">
          {tags.map((aTag) => (
            <h1
              className="px-2 py-1 mr-2 rounded-md bg-sky-200 dark:bg-sky-700 w-30"
              key={aTag.id}
            >
              {aTag.name}
            </h1>
          ))}
        </div>
      </div>
    </div>
  );
}
