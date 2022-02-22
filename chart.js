const date = document.getElementById('date')

async function drawLineChart(c, fill, color) {
    // 1. Access data
    const rawData = await d3.csv('./data/population.csv', d3.autoType)
    const country = rawData.filter(({ country }) => country === c)
    console.log(rawData)

    // const p = d3.precisionPrefix(1e5, 1.3e6)
    // const f = d3.formatPrefix("." + p, 1.3e6)
    const yAccessor = d => d.population
    const xAccessor = d => d.decade

    // 2. Create chart dimensions
    const dms = {
        width: window.innerWidth * 0.95,
        height: 500,
        margins: {
            top: 15,
            right: 15,
            bottom: 40,
            left: 75
        }
    }

    dms.boundedWidth = dms.width - dms.margins.left - dms.margins.right
    dms.boundedHeight = dms.height - dms.margins.top - dms.margins.bottom

    // 3. Draw canvas
    const wrapper = d3.select('#wrapper')
        .append('svg')
            .attr('width', dms.width)
            .attr('height', dms.height)

    const bounds = wrapper.append('g')
            .style('transform', `translate(
                ${dms.margins.left}px,
                ${dms.margins.top}px
            )`)

    // 4. Create scales
    const yScale = d3.scaleLinear()
    .domain(d3.extent(country, yAccessor))
    .range([dms.boundedHeight, 0])
    .nice(10)

    const xScale = d3.scaleLinear()
        .domain(d3.extent(country, xAccessor))
        .range([0, dms.boundedWidth])

    // 5. Draw data
    const areaGenerator = d3.area()
        .y1(d => yScale(yAccessor(d)))
        .y0(() => dms.boundedHeight)
        .x(d => xScale(xAccessor(d)))
        .curve(d3.curveMonotoneX)

    const line = bounds.append('path')
            .attr('d', areaGenerator(country))
            .attr('fill', fill)
            .attr('stroke', color)
            .attr('stroke-width', .5)
            .attr('stroke-opacity', 0.5)

    // 6. Draw peripherals
    const yAxisGenerator = d3.axisLeft()
        .scale(yScale)
        .tickFormat(d3.format('~s'))

    const yAxis = bounds.append('g')
        .call(yAxisGenerator)
        .style('color', color)

    const xAxisGenerator = d3.axisBottom()
        .scale(xScale)

    const xAxis = bounds.append('g')
        .call(xAxisGenerator)
        .style('color', color)
        .style('transform', `translateY(${dms.boundedHeight}px)`)

    const xAxisLabel = xAxis.append('text')
            .attr('x', dms.boundedWidth / 2)
            .attr('y', dms.margins.bottom)
            .attr('fill', color)
            .style('font-size', '1rem')
            .text('Years')
}

const countries = [
    {
        country: 'Austria',
        fillColor: '#FFCDD2',
        strokeColor: '#B71C1C'
    },
    {
        country: 'Belgium',
        fillColor: '#F8BBD0',
        strokeColor: '#880E4F'
    },
    {
        country: 'Czech Republic',
        fillColor: '#E1BEE7',
        strokeColor: '#4A148C'
    },
    {
        country: 'Denmark',
        fillColor: '#D1C4E9',
        strokeColor: '#311B92'
    },
    {
        country: 'England',
        fillColor: '#C5CAE9',
        strokeColor: '#1A237E'
    },
    {
        country: 'Estonia',
        fillColor: '#BBDEFB',
        strokeColor: '#0D47A1'
    },
    {
        country: 'Finland',
        fillColor: '#B3E5FC',
        strokeColor: '#01579B'
    },
    {
        country: 'France',
        fillColor: '#B2EBF2',
        strokeColor: '#006064'
    },
    {
        country: 'Germany',
        fillColor: '#B2DFDB',
        strokeColor: '#004D40'
    },
    {
        country: 'Hungary',
        fillColor: '#C8E6C9',
        strokeColor: '#1B5E20'
    },
    {
        country: 'Ireland',
        fillColor: '#DCEDC8',
        strokeColor: '#33691E'
    },
    {
        country: 'Italy',
        fillColor: '#F0F4C3',
        strokeColor: '#827717'
    },
    {
        country: 'Luxembourg',
        fillColor: '#FFF9C4',
        strokeColor: '#F57F17'
    },
    {
        country: 'Netherlands',
        fillColor: '#FFECB3',
        strokeColor: '#FF6F00'
    },
    {
        country: 'Northern Ireland',
        fillColor: '#FFE0B2',
        strokeColor: '#E65100'
    },
    {
        country: 'Norway',
        fillColor: '#FFCCBC',
        strokeColor: '#BF360C'
    },
    {
        country: 'Poland',
        fillColor: '#D7CCC8',
        strokeColor: '#3E2723'
    },
    {
        country: 'Portugal',
        fillColor: '#F5F5F5',
        strokeColor: '#212121'
    },
    {
        country: 'Scotland',
        fillColor: '#CFD8DC',
        strokeColor: '#263238'
    },
    {
        country: 'Slovakia',
        fillColor: '#FF8A80',
        strokeColor: '#D50000'
    },
    {
        country: 'Spain',
        fillColor: '#FF80AB',
        strokeColor: '#C51162'
    },
    {
        country: 'Sweden',
        fillColor: '#EA80FC',
        strokeColor: '#AA00FF'
    },
    {
        country: 'Switzerland',
        fillColor: '#B388FF',
        strokeColor: '#6200EA'
    },
    {
        country: 'Wales',
        fillColor: '#8C9EFF',
        strokeColor: '#304FFE'
    },
]

countries.forEach(({
    country,
    fillColor,
    strokeColor
}) => drawLineChart(country, fillColor, strokeColor))


date.textContent = `Oleksandr Popov | ${new Date().getFullYear()}`