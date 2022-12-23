import { VisHeader } from '@vis/components';

function Space1() {
  return (
    <div style={{ display: 'flex' }}>
      <VisHeader
        style={{ width: 200, marginRight: '10px' }}
        tabs={[
          {
            title: 'SQL视图',
            key: '1',
            content: <div style={{ height: 200, background: 'white' }}></div>,
          },
        ]}
      />
      <VisHeader
        tabs={[
          {
            title: '表视图',
            key: '1',
            content: (
              <div style={{ height: 400, background: 'white' }}>
                <h1>Table View</h1>
              </div>
            ),
          },
          {
            title: 'SQL视图',
            key: '2',
            content: (
              <div style={{ height: 400, background: 'white' }}>
                <h1>SQL View</h1>
              </div>
            ),
          },
        ]}
        tabBarExtraContent={<div>🫱</div>}
      >
        {(item) => {
          return <div>{item?.content}</div>;
        }}
      </VisHeader>
    </div>
  );
}

export default Space1;
