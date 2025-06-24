|#|Check name|Test data|
|:----:|:----:|:----:|
|1|POST order with valid income >0, RC=200|100|
|2|POST order with negative income,RC=400|-100|
|3|POST order with negative debt, RC=400|-1|
|4|POST order with positive debt, RC=200|1|
|5|POST order with age more than 16, RC=200|17|
|6|POST order with age less than 16, RC=200|15|