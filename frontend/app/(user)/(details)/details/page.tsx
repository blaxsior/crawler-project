'use client';
import { Pie, Line, getElementAtEvent } from 'react-chartjs-2';
import {
  Chart,
  ChartData,
  ArcElement,
  Legend,
  Tooltip,
  Title,
  CategoryScale,
  LinearScale,
  PointElement,
  LineController,
  LineElement,
} from 'chart.js';
import { colors } from '@/lib/utils';
import { useRef } from 'react';

Chart.register(
  // Pie
  ArcElement,
  // Line
  LineController,
  PointElement,
  CategoryScale,
  LinearScale,
  LineElement,
  // common
  Legend,
  Tooltip,
  Title,
);

const DetailPage = () => {
  // const data = await fetch(); => 나중에 추가해야 함
  const lineref = useRef<Chart<'line'>>(null);
  const data: ChartData<"pie"> = {
    labels: ['positive', 'negative'],
    datasets: [
      {
        label: "윤석열 지지율",
        data: [341, 553],
        backgroundColor: colors.slice(0, 2),
        hoverOffset: 4,
      }
    ],
  };
  const data2: ChartData<"line"> = {
    labels: [
      '7/14', '7/21', '7/28', '8/5'
    ],
    datasets: [
      {
        label: "긍정 비율",
        data: [40, 30, 60, 20],
        backgroundColor: colors[0], // 점 색
        borderColor: colors[0] // 선 색
      },
      {
        label: "부정 비율",
        data: [60, 70, 40, 80],
        backgroundColor: colors[1],
        borderColor: colors[1]
      }
    ]
  }
  return (
    <div>
      <h1 className='text-xl font-bold'>검색: 윤석열</h1>
      <div className='flex flex-auto justify-center items-center gap-10'>
        <div>
          <Line data={data2} title={'지지율 변화 추이'}
          ref={lineref}
          onClick={(event) => {
            const element = getElementAtEvent(lineref.current!, event);
            if(element.length > 0) {
              const elem = element[0];
              elem.datasetIndex // 어디에 속하는지 정보
              elem.index // 클릭한 데이터가 몇번째 데이터인지?
            }
            console.log(element);
          }
          }/>
        </div>
        <div>
          <Pie data={data} title={'윤석열 지지율'} />
        </div>
      </div>
      <div>detail page test</div>
    </div>
  )
};

export default DetailPage;