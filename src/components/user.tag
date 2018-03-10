<user>
  <figure>
    <div class="image-wrapper">
      <img width="100%" src={opts.image}/>
    </div>
    <figcaption>{ opts.name }</figcaption>
  </figure>
  <style>
    figure {
      margin: 0;
      display: flex;
      align-items: center;
    }

    figcaption {
      margin-left: 16px;
    }

    .image-wrapper {
      width: 50px;
      height: 50px;
      border-radius: 50%;
      overflow: hidden;
    }
  </style>
</user>