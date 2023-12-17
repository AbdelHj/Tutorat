import React, { Fragment } from 'react';
import { Col, Container, Row } from 'reactstrap';
import { Breadcrumbs } from '../../../AbstractElements';
import ActiveLessons from './ActiveLessons';
import ActivityHours from './ActivityHours';
import Calender from '../../Common/CommonWidgets/Calender';
import GreetingCard2 from './GreetingCard2';
import GreetingGrid from './GreetingGrid';
import LearningOverview from './LearningOverview';
import MyCourse from './MyCourse';
import TodayProgress from './TodayProgress';
import UpcomingEvents from './UpcomingEvents';
import UpcomingSchedule from './UpcomingSchedule';
import ActivityCard from '../Default/ActivityCard';

const OnlineCourse = () => {
  return (
    <Fragment>
      <Breadcrumbs mainTitle='Online Course' parent='Dashboard' title='Online Course' />
      <Container fluid={true}>
        <Row>
          <GreetingGrid />
          <Col xxl='2' xl='4' sm='6' className='col-ed-3 box-col-5'>
            <Calender />
          </Col>
          <Col xxl='5' xl='8' className='notification box-col-6'>
            <ActivityCard />
          </Col>
          <Col xxl='2' xl='4' sm='6' className='col-ed-6 box-col-7'>
            <UpcomingSchedule />
          </Col>
          <Col xl='2' className='col-ed-3 d-xxl-block d-sm-none box-col-none'>
            <GreetingCard2 />
          </Col>
          
        </Row>
      </Container>
    </Fragment>
  );
};

export default OnlineCourse;
