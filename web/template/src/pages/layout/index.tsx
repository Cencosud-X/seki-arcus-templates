import { AuthenticationClient, IJwtEntity } from '@arcus-core/web-core-utilities';
import React, { lazy, Suspense, useEffect, useState } from 'react';
import { useNavigate, Routes, Route, useLocation } from 'react-router-dom'
import Styles from 'styled-components'
import TemplateClient from '../../clients/TemplateClient';
import Header from '../../components/Header';
import SideBar from '../../components/SideBar';
import { IWidget } from '../../models/IWidget';
import RootPage from '../home'
import { hotjar } from 'react-hotjar';

interface IProps {}

const PageWrapper = Styles.section `
display: flex;
flex-direction: row;
@media (max-width: 768px) {
  flex-direction: column;
}
`

const Sections = Styles.div `
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
`

const Content = Styles(Sections)`
  width: calc(100% - 292px);
  background: #F4F4F4;
  padding: 0 48px 0 24px;
  align-items: flex-start;
  @media (max-width: 768px) {
    width: 100%;
  }
`

const MainLayout: React.FC<IProps> = () =>  {

  const [widgets, setWidgets] = useState<Array<IWidget> | undefined>();
  const [widgetsCharge, setWidgetsCharge] = useState(false);
  const [user, setUser] = useState<IJwtEntity | undefined>();
  const [userName, setUserName] = useState<string>('')

  const navigate = useNavigate();

  useEffect(() => {
    handleWidgets();
    getUserData()
    handleName()
    // Identify the user
    hotjar.identify(userName, { userProperty: 'value' });
  }),[]

  const getUserData = async () => {
    const userInfo = await AuthenticationClient.getInfo()
    setUser(userInfo)
  }

  const handleName = async () => {
    const name: Array<string> | undefined = user?.unique_name?.split(' ');
    if(!name) return user?.unique_name
    return setUserName(`${name[0]} ${name[1]}`);
  }

  const handleWidgets = async () => {
    try {
      if(!widgetsCharge) {
        const widget = await TemplateClient.getAllWidgets();
        setWidgetsCharge(true);
 
        return setWidgets(widget)
      }
    } catch (error) {
      console.error(error)
    }
  }
  const location = useLocation();

  return (
    <PageWrapper>
      <SideBar currentPath={location.pathname}/>
      <Content>
        <Header name={userName}/>
        <Routes>
          <Route path={'/'} element={
            <RootPage 
              name={userName}
              widgets={widgets} 
              onClick={(page: string)=> {navigate(page)}}
            />
          } />
          {widgets?.map((widget, key) => {
            const Cont = lazy(() => import(`../../modules${widget.url}/content`));
            return <Route
            key={key} 
            path={widget.url} 
            element={
              <Suspense fallback={<h1>Loading page</h1>}>
                <Cont />
              </Suspense>
            } />
          })}
        </Routes>
      </Content>
    </PageWrapper>
  );
}

export default MainLayout
