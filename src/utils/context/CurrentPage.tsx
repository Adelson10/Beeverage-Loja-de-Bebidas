import React from 'react';

const PageContext = React.createContext({});
type CurrentPageProps = React.PropsWithChildren;

const CurrentPage = ({children}: CurrentPageProps) => {
  const [currentPage, setCurrentPage] = React.useState('');

  return (
    <PageContext.Provider value={ {currentPage, setCurrentPage} as ValueProps}>
      {children}
    </PageContext.Provider>
  )
}

export default CurrentPage;

export const useCurrentPage = () => React.useContext(PageContext);