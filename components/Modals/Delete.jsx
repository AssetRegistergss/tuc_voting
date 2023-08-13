import React from 'react'

export default function Delete() {
  return (
    <div>
      <Modal 
animation="ScaleUp" 
duration={0.4} 
open={modal}
backdrop
maxWidth="500px"
>

<ModalContent funcss="padding-20">
    <RowFlex gap="2rem">
        <Div>
        <Div funcss="avatar light-danger" width="40px" height="40px">
        <Icon icon="fas fa-info"  />
        </Div>
        </Div>
        <Div>
            <Typography
            text="Deactivate Account!"
            heading="h4"
            block
            />
            <Typography
            color="secondary"
            text="Are you sure you want to deactivate your account? "
            block
            />
        </Div>

    </RowFlex>
</ModalContent>
<ModalAction funcss="text-right light bottomEdge padding-20">
<Button 
bg="success"
outlined
text="Cancel"
rounded
onClick={()=>setmodal(false)}
/>
<Button 
bg="light-danger"
text="Deactivate"
rounded
onClick={()=>setmodal(false)}
/>
</ModalAction>
</Modal>
    </div>
  )
}
