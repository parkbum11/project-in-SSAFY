import React, { useEffect, useRef, useState } from 'react';
import styles from './mission_do_playground.module.css';
import { FaRegPlayCircle } from 'react-icons/fa';

const MissionDoPlayground = ({ startPosition, endPosition, javascript_code, 
                                onChangeSuccess, onChangeFail, imageUrl }) => {
  var x = 0;
  var y = 0;
  var move = [];
  var cur_angle = 0;

  const fieldchar = useRef();
  const back_img_ref = useRef();
  const item = fieldchar.current;

  const [image_x, setImage_x] = useState(startPosition[0]);
  const [image_y, setImage_y] = useState(startPosition[1]);

  const playGame = () => {
    eval(javascript_code);
    item.style.transition = `all .${move.length*10}s ease .5s`

    let x = image_x;
    let y = image_y;

    let dir_x = 0;
    let dir_y = 0;

    const timer = ms => new Promise(res => setTimeout(res, ms))
    async function jinok() {
      for (let i = 0; i < move.length; i++) {

        const new_dir_x = Math.round(move[i][0] - dir_x);
        const new_dir_y = Math.round(move[i][1] - dir_y);
        
        if (new_dir_x > 0 && new_dir_y === 0) {
          item.setAttribute('src', `/images/character/character_right.png`)
        } else if (new_dir_x < 0 && new_dir_y === 0) {
          item.setAttribute('src', `/images/character/character_left.png`)
        } else if (new_dir_x === 0 && new_dir_y > 0) {
          item.setAttribute('src', `/images/character/character_back.png`)
        } else {
          item.setAttribute('src', `/images/character/character_front.png`)
        }
        dir_x = move[i][0];
        dir_y = move[i][1];
        await timer(500);

        x = image_x + (move[i][0] * 50) + 10 - 25;
        y = image_y - (move[i][1] * 50) + 10 - 25;

        item.style.left = `${x}px`;
        item.style.top = `${y}px`;

        await timer(1000);
      }
      if (endPosition[0] >= (x - 5) && endPosition[0] <= (x + 5) &&
          endPosition[1] >= (y - 5) && endPosition[1] <= (y + 5)) {
            onChangeSuccess();
      } else {
        onChangeFail();
      }
    }
    jinok()
  };

  useEffect(() => {
    const item = fieldchar.current; 

    item.setAttribute('className', `image`)
    item.setAttribute('src', `/images/character/character_right.png`)

    item.style.position = 'absolute';
    item.style.transform = `translate(-50%, -50%)`
    item.style.left = `${image_x + 10 - 25}px`;
    item.style.top = `${image_y + 10 - 25}px`;
  })

  useEffect(() => {
    back_img_ref.current.style.background = `url(${imageUrl}) center/cover`
  }, [])
  
       // 함수
  /////////////////////////////////////////////////////////////////
  var my_var = 0;  
  var my_var1 = 0;
  var my_var2 = 0;
  var my_var3 = 0;
  var inputVar = 0;
  var outputVar = 0;


  // 움직임 
/////////////////////////////////////////////////////////////////
  const turn_right = () => {
    cur_angle -= 90 * Math.PI / 180;
  }

  const turn_left = () => {
    cur_angle += 90 * Math.PI / 180;
  }
  const turn_back = () => {
    cur_angle += 180 * Math.PI / 180;
  }
  /////////////////////

  const move_x = (x_distance) => {
    x += x_distance;
    move.push([x, y]);
  }

  const move_y = (y_distance) => {
    y += y_distance;
    move.push([x, y]);
  }

  const point_x = (x_point) => {
    x = x_point;
    move.push([x, y]);
  }

  const point_y = (y_point) => {
    y = y_point;
    move.push([x,y]);
  }

  const point_x_y = (x_point, y_point) => {
    x = x_point;
    y = y_point;
    move.push([x, y]);
  }

  const turn_angle = (angle) => {
    cur_angle += angle * Math.PI / 180;
  }

  const set_angle = (angle) => {
    cur_angle = angle * Math.PI / 180;
  }

  const set_angle_move = (angle, distance) => {
    var new_angle = angle * Math.PI / 180;
    x += distance * Math.cos(new_angle);
    y += distance * Math.sin(new_angle);
    move.push([x, y]);
  }

  const move_forward = (text_distance) => {
    x += text_distance * Math.cos(cur_angle);
    y += text_distance * Math.sin(cur_angle);
    move.push([x, y]);
  }


  // 계산
  //////////////////////////////////////////////////////////////////////////////////////////////////////////
  const num_js = (text_num) => {
    return text_num;
  }
  const addition_js = (value_num1, value_num2) => {
    return value_num1 + value_num2;
  };
  const subtraction_js = (value_num1, value_num2) => {
    return value_num1 - value_num2;
  };
  const multiplication_js = (value_num1, value_num2) => {
    return value_num1 * value_num2;
  };
  const division_js = (value_num1, value_num2) => {
    return value_num1 / value_num2;
  };
  const random_num_js = (value_num1, value_num2) => {
    return Math.floor(Math.random() * (value_num2 - value_num1 + 1)) + value_num1;
  };
  const quotient_js = (value_num1, value_num2) => {
    return parseInt(value_num1 / value_num2);
  };
  const remainder_js = (value_num1, value_num2) => {
    return value_num1 % value_num2;
  };
  const square_js = (value_num) => {
    return value_num * value_num;
  };
  const sqrt_js = (value_num) => {
    return Math.sqrt(value_num);
  };
  const integer_js = (value_num) => {
    return parseInt(value_num);
  };
  const roundup_js = (value_num) => {
    return Math.ceil(value_num);
  };
  const round_js = (value_num) => {
    return Math.round(value_num);
  };
  const abs_val_js = (value_num) => {
    return Math.abs(value_num);
  };
  

  return (
    <div className={styles.body}>
      <section className={styles.game} ref={back_img_ref}>
        <img ref={fieldchar}></img>
      </section>
      <footer className={styles.footer}>
        <div 
          onClick={playGame}
          className={styles.game__button}
        >
          <FaRegPlayCircle size="60" color="#c30d23"/>
        </div>
      </footer>
    </div>
  )
}

export default MissionDoPlayground;