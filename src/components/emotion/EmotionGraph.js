import React from "react";
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import am4themes_material from "@amcharts/amcharts4/themes/material";
import PropTypes from "prop-types";
import _ from 'underscore'
import {getEmotionPoint, getEmotionProportion, getSatisfactionPoint} from "../../utils/EmtionUtils";

class EmotionGraph extends React.Component {

    constructor(props) {
        super(props);
        this.realDataLength = 0;
    }

    componentDidMount() {
        this.initializeChart();
        this.addDataPointInterval = setInterval(this.addDataPoint, 1000)
    }

    componentWillUnmount() {
        if (this.chart) {
            this.chart.dispose();
        }
        if (this.addDataPointInterval) {
            clearInterval(this.addDataPointInterval);
            this.addDataPointInterval = null
        }
    }

    initializeChart = () => {
        // Set theme for the next chart
        am4core.useTheme(am4themes_animated);
        am4core.useTheme(am4themes_material);

        // Create XY chart
        this.chart = am4core.create("chartdiv", am4charts.XYChart);
        this.chart.hiddenState.properties.opacity = 0;
        this.chart.padding(0, 0, 0, 0);
        this.chart.zoomOutButton.disabled = true;

        let dummyData = [];
        for (let i = 0; i <= 30; i++) {
            dummyData.push({ date: new Date().setSeconds(i - 30), value: 0 });
        }
        this.chart.data = dummyData;

        // Setup x-axis
        const dateAxis = this.chart.xAxes.push(new am4charts.DateAxis());
        dateAxis.renderer.grid.template.location = 0;
        dateAxis.renderer.minGridDistance = 30;
        dateAxis.dateFormats.setKey("second", "ss");
        dateAxis.periodChangeDateFormats.setKey("second", "[bold]h:mm a");
        dateAxis.periodChangeDateFormats.setKey("minute", "[bold]h:mm a");
        dateAxis.periodChangeDateFormats.setKey("hour", "[bold]h:mm a");
        dateAxis.renderer.axisFills.template.disabled = true;
        dateAxis.renderer.ticks.template.disabled = true;
        dateAxis.renderer.labels.template.fontSize = 20;
        dateAxis.interpolationDuration = 500;
        dateAxis.rangeChangeDuration = 500;

        // Setup y-axis
        const valueAxis = this.chart.yAxes.push(new am4charts.ValueAxis());
        valueAxis.title.text = "Satisfaction";
        valueAxis.min = 0;
        valueAxis.max = 100;
        valueAxis.strictMinMax = true;
        valueAxis.renderer.labels.template.fontSize = 20;
        valueAxis.renderer.inside = true;
        valueAxis.renderer.axisFills.template.disabled = true;
        valueAxis.renderer.ticks.template.disabled = true;
        valueAxis.renderer.labels.template.dy = 10;
        valueAxis.renderer.minGridDistance = 20;
        valueAxis.interpolationDuration = 500;
        valueAxis.rangeChangeDuration = 500;

        // Setup series
        this.series = this.chart.series.push(new am4charts.LineSeries());
        this.series.stroke = am4core.color("#CDA2AB");
        this.series.strokeWidth = 3;
        this.series.interpolationDuration = 500;
        this.series.defaultState.transitionDuration = 0;
        this.series.tensionX = 0.8;
        this.series.dataFields.valueY = "value";
        this.series.dataFields.dateX = "date";

        // Decorate the chart
        // -- Set gradient
        this.series.fillOpacity = 1;
        let gradient = new am4core.LinearGradient();
        gradient.addColor(this.chart.colors.getIndex(0), 0.2);
        gradient.addColor(this.chart.colors.getIndex(0), 0);
        this.series.fill = gradient;
        // -- Bullet at the front of the line
        const bullet = this.series.createChild(am4charts.CircleBullet);
        bullet.circle.radius = 5;
        bullet.fillOpacity = 1;
        bullet.fill = this.chart.colors.getIndex(0);
        bullet.isMeasured = false;

        // Set events to update chart
        this.series.events.on("validated", () => {
            bullet.moveTo(this.series.dataItems.last.point);
            bullet.validatePosition();
        });
        this.chart.events.on("datavalidated", () => {
            dateAxis.zoom({ start: 1 / 15, end: 1.2 }, false, true);
        });
    };

    addDataPoint = () => {
        const { emotionHistory } = this.props;
        const shouldAddDataPoint = this.realDataLength < emotionHistory.length;

        const lastItem = this.series.dataItems.getIndex(this.series.dataItems.length - 1);
        const nextDataPoint = {
            date: new Date(lastItem.dateX.getTime() + 1000)
        };
        if (shouldAddDataPoint) {
            console.log("Add new data point...");
            this.realDataLength++;
            const emotionProportion = getEmotionProportion(emotionHistory);
            nextDataPoint.value = getSatisfactionPoint(emotionProportion);
        } else {
            nextDataPoint.value = lastItem.valueY;
        }
        this.chart.addData(nextDataPoint, 1);
    };

    render() {
        return (
            <div id="chartdiv" style={{ width: "50%", height: "500px" }}/>
        );
    }

}

EmotionGraph.propTypes = {
    emotionHistory: PropTypes.array
};

EmotionGraph.defaultProps = {
    emotionHistory: []
};

export default EmotionGraph;