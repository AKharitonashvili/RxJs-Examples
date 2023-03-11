import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { LogPipe } from './pipes/log.pipe';

const components = [SpinnerComponent];
const pipes = [LogPipe];

@NgModule({
  imports: [CommonModule, MatProgressSpinnerModule],
  declarations: [...components, ...pipes],
  exports: [...components, ...pipes],
})
export class UiModule {}
