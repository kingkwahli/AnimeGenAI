import { 
  provideFluentDesignSystem, 
  fluentButton, 
  fluentTextField 
} from 'https://unpkg.com/@fluentui/web-components@2.0.0';

provideFluentDesignSystem().register(fluentButton(), fluentTextField());
