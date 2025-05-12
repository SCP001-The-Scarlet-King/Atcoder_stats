import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

const ProblemDifficultyGraph = ({ problemsByDifficulty, title }) => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    if (!problemsByDifficulty || problemsByDifficulty.length === 0) {
      return;
    }

    const colors = [
      '#808080', '#8B4513', '#008000', '#00FFFF', '#0000FF', '#FFFF00', '#FFA500', '#FF0000', '#8B0000', '#8B0000'
    ];

    const labels = [];
    const data = [];
    const backgroundColors = [];

    problemsByDifficulty.forEach((count, index) => {
      if (count > 0) {
        const lowerBound = index * 100;
        const upperBound = (index + 1) * 100 - 1;
        labels.push(`${lowerBound}`);
        data.push(count);
        backgroundColors.push(colors[Math.min(Math.floor(index / 4), colors.length - 1)]);
      }
    });

    const ctx = chartRef.current.getContext('2d');
    chartInstance.current = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [{
          label: 'Problems',
          data: data,
          backgroundColor: backgroundColors,
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'top',
          },
          title: {
            display: true,
            text: title,
          },
        },
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              stepSize: 1,
            },
          },
        },
      }
    });

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [problemsByDifficulty, title]);

  return (
    <div style={{ height: '400px' }}>
      <canvas ref={chartRef} />
    </div>
  );
};

export default ProblemDifficultyGraph;