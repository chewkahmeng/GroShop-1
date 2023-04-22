use userservice;
----------------------------------
-- INSERTING ADMIN USERS
----------------------------------
-- Employee1@example.com/Employee1
insert into userservice.tbl_user
(username, email, password, role)
values("Employee1", "Employee1@example.com", "$2b$10$t5AD.ZWwNEBV5G3WwyWv7.QQi.LT60P/3gTVnAiSqAjD4aodGEBga" , "ADMIN");

-- Employee2@example.com/Employee2
insert into userservice.tbl_user
(username, email, password, role)
values("Employee2", "Employee2@example.com", "$2b$10$oc4eqeYchkUfnQnCcPEO6eHRt8AiJDbqUya.krIowFV9tqxW7vN8C" , "ADMIN");

-- Employee3@example.com/Employee3
insert into userservice.tbl_user
(username, email, password, role)
values("Employee3", "Employee3@example.com", "$2b$10$AfuBqWfKoQOZ9YUhHO1KPOq9RlvLDCjMDliVtkfZBInt5IJXavEDi" , "ADMIN");

----------------------------------
-- INSERTING CUSTOMER USERS
----------------------------------
-- Customer1@example.com/Customer1
insert into userservice.tbl_user
(username, email, password, role)
values("Customer1", "Customer1@example.com", "$2b$10$t5AD.ZWwNEBV5G3WwyWv7.QQi.LT60P/3gTVnAiSqAjD4aodGEBga" , "CUSTOMER");

-- Customer2@example.com/Customer2
insert into userservice.tbl_user
(username, email, password, role)
values("Customer2", "Customer2@example.com", "$2b$10$KfvLLc47gUimFo1xfI3IDuQrgQmLR1MfNOao9GquiMjh1OXiBTPaC" , "CUSTOMER");

-- Customer3@example.com/Customer3
insert into userservice.tbl_user
(username, email, password, role)
values("Customer3", "Customer3@example.com", "$2b$10$KRHgQx2JGD7mUp/.2r.FzOcXMkDz3qExxRTeB0Vi30XWjIgXIsJ4a" , "CUSTOMER");